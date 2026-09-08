import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import { sanitizeQuestions, validateQuizDataset } from './src/lib/validator.ts';
import { Question } from './src/types.ts';
import { runAgenticQuizValidation } from './src/server/agenticQuizValidator.ts';

dotenv.config();

// Lazy initialization for Gemini API
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Utility: safely parse JSON with markdown stripping and boundary repair
function safeParseJSON(rawText: string): any {
  if (!rawText) {
    throw new Error('Empty response from model');
  }

  let cleaned = rawText.trim();
  // Strip markdown code fences (```json ... ``` or ``` ...)
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

  // Find first { or [
  const firstBrace = cleaned.indexOf('{');
  const firstBracket = cleaned.indexOf('[');
  let startIdx = 0;
  if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    startIdx = firstBrace;
  } else if (firstBracket !== -1) {
    startIdx = firstBracket;
  }
  cleaned = cleaned.substring(startIdx);

  try {
    return JSON.parse(cleaned);
  } catch (initialErr) {
    // Attempt fallback heuristic repairs for truncated JSON
    const lastBrace = cleaned.lastIndexOf('}');
    const lastBracket = cleaned.lastIndexOf(']');
    const cutPos = Math.max(lastBrace, lastBracket);
    if (cutPos > 0) {
      const truncated = cleaned.slice(0, cutPos + 1);
      try { return JSON.parse(truncated); } catch {}
      try { return JSON.parse(truncated + ']}'); } catch {}
      try { return JSON.parse(truncated + '}'); } catch {}
      try { return JSON.parse(truncated + ']'); } catch {}
    }
    throw initialErr;
  }
}

async function generateWithFallback(
  ai: GoogleGenAI,
  prompt: string,
  systemPrompt: string,
  schema: any
): Promise<any> {
  // Prioritized models: fast and reliable flash-lite first, then flash-latest and 3.7-flash
  const MODELS = ['gemini-3.1-flash-lite', 'gemini-flash-latest', 'gemini-3.7-flash'];
  let lastError: any = null;

  for (const model of MODELS) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: model,
          contents: prompt,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: 'application/json',
            responseSchema: schema,
          },
        });

        if (response && response.text) {
          const parsed = safeParseJSON(response.text);
          return parsed;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${model} attempt ${attempt} failed:`, err?.message || err);
        // Small delay before retrying or switching models
        await new Promise((resolve) => setTimeout(resolve, 600));
      }
    }
  }

  throw new Error(lastError?.message || 'Failed to generate content with Gemini AI.');
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // API Route: Health
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      app: 'Quiz for YouTube Generator',
      hasApiKey: !!process.env.GEMINI_API_KEY,
      agenticValidator: true,
    });
  });

  // API Route: Review a complete quiz with local, editorial, and optional web-evidence agents.
  app.post('/api/validate-quiz-agentic', async (req: Request, res: Response) => {
    try {
      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({
          error: 'GEMINI_API_KEY is required for agentic review. Local format checks remain available without it.',
        });
      }
      const report = await runAgenticQuizValidation(ai, req.body?.quiz, req.body?.mode);
      return res.json(report);
    } catch (error: any) {
      console.error('Agentic Quiz Validation Error:', error);
      return res.status(500).json({
        error: error?.message || 'The agentic quiz review failed unexpectedly.',
      });
    }
  });

  // API Route: Generate Quiz by Theme
  app.post('/api/generate-quiz', async (req: Request, res: Response) => {
    try {
      const { theme, cycles = 4, difficulty = 'moderate' } = req.body;
      const answerChoiceCount: 2 | 3 = Number(req.body?.answerChoiceCount) === 3 ? 3 : 2;
      const answerLabels = answerChoiceCount === 2 ? 'A (index 0), B (index 1)' : 'A (index 0), B (index 1), C (index 2)';
      const correctIndexDescription = answerChoiceCount === 2 ? '0 or 1' : '0, 1, or 2';

      if (!theme || typeof theme !== 'string' || theme.trim().length === 0) {
        return res.status(400).json({ error: 'Theme topic is required.' });
      }

      const compactTwenty = Number(cycles) === 4;
      const cycleCount = Math.max(1, Math.min(10, Number(cycles) || 4));
      const totalQuestionsExpected = compactTwenty ? 20 : cycleCount * 6;
      const mcqExpected = compactTwenty ? 16 : cycleCount * 5;
      const numExpected = cycleCount * 1;

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY is not configured in the environment. Please check the Secrets panel.',
        });
      }

      const questionItemSchema = {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING, description: '"mcq" or "number"' },
          question: { type: Type.STRING },
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: `For MCQ: exactly ${answerChoiceCount} clean options without parentheses or brackets`,
          },
          correctIndex: {
            type: Type.INTEGER,
            description: `For MCQ: ${correctIndexDescription}`,
          },
          target: {
            type: Type.NUMBER,
            description: 'For Number: target numeric value',
          },
          metricUnit: {
            type: Type.STRING,
            description: 'For Number: metric unit (e.g. km, meters, years, people)',
          },
          imperialDisplay: {
            type: Type.STRING,
            description: 'For Number: optional imperial display (e.g. 50 miles)',
          },
          explanation: {
            type: Type.STRING,
            description: 'Concise, high-accuracy factual explanation (1-2 sentences)',
          },
        },
        required: ['type', 'question', 'explanation'],
      };

      const systemPrompt = `You are a world-class educational quiz generator and trivia master.
Generate an interactive, high-accuracy quiz on the requested topic strictly adhering to this blueprint:

NON-NEGOTIABLE RULES:
1. Structure: ${compactTwenty ? 'Generate exactly 20 questions as four cycles of 4 MCQs followed by 1 Guess-the-Number question.' : 'Repeat this cycle: 5 MCQs followed by 1 Guess-the-Number question.'}
2. MCQ Rules:
   - Exactly ${answerChoiceCount} distinct, plausible options: ${answerLabels}.
   - Knowledge-based only: NO math calculations, NO arithmetic, NO equations, NO percentages, NO unit conversions.
   - Clean options: NEVER use brackets or parentheses in any option (NO "(", ")", "[", "]").
   - NEVER append translations, conversions, hints, or labels to options.
   - "correctIndex" must be integer ${correctIndexDescription}.
   - Balance correct answer positions evenly across ${answerChoiceCount === 2 ? 'A and B' : 'A, B, and C'}.
   - Concise, factual explanation (1-2 sentences) for every question.
3. Guess-the-Number Rules:
   - Factual estimate only (NO mathematical operations or formulas).
   - "target" must be a pure integer or float number (e.g. 193).
   - "metricUnit": primary metric unit (e.g. "km", "meters", "seats", "years", "people", "moons").
   - "imperialDisplay": presentation-only imperial conversion if applicable (e.g. "120 miles").
   - Concise, factual explanation (1-2 sentences) for every question.
4. Quality:
   - Use high-confidence, fascinating facts.
   - No duplicates or near-duplicates.
   - Every single question must be on the specified theme: "${theme.trim()}".
   - Difficulty level: ${difficulty}.`;

      let allQuestions: Question[] = [];
      let quizTitle = `${theme.trim()} Quiz`;
      let quizDescription = `Explore fascinating facts and records about ${theme.trim()}.`;

      if (cycleCount <= 2) {
        // Direct single batch generation for 1 or 2 cycles (6 or 12 questions)
        const schema = {
          type: Type.OBJECT,
          properties: {
            theme: { type: Type.STRING },
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: questionItemSchema,
            },
          },
          required: ['theme', 'title', 'description', 'questions'],
        };

        const prompt = `Topic/Theme: "${theme.trim()}".
Generate exactly ${totalQuestionsExpected} questions (${mcqExpected} MCQs and ${numExpected} Number Estimates) following the required repeating pattern.
Keep explanations concise (1-2 sentences).
Return the structured quiz JSON object.`;

        const result = await generateWithFallback(ai, prompt, systemPrompt, schema);
        if (result.title) quizTitle = result.title;
        if (result.description) quizDescription = result.description;
        if (Array.isArray(result.questions)) {
          allQuestions = result.questions;
        }
      } else {
        // Parallel chunked generation: batch into sub-units of 2 cycles (12 questions each)
        // This ensures lightning fast parallel responses without hitting token limits or JSON truncation
        const batchSizes: number[] = [];
        let remainingCycles = cycleCount;
        while (remainingCycles > 0) {
          const take = Math.min(2, remainingCycles);
          batchSizes.push(take);
          remainingCycles -= take;
        }

        const focusAreas = [
          'Foundations, Origins & Core Principles',
          'Historic Milestones, Pioneers & Key Events',
          'Modern Innovations, Records & Breakthroughs',
          'Global Impact, Culture & Unsung Facts',
          'Extreme Records, Curiosities & Deep Trivia',
        ];

        const schema = {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: questionItemSchema,
            },
          },
          required: ['questions'],
        };

        const batchPromises = batchSizes.map((cyclesInBatch, idx) => {
          const mcqInBatch = compactTwenty ? cyclesInBatch * 4 : cyclesInBatch * 5;
          const numInBatch = cyclesInBatch * 1;
          const totalInBatch = compactTwenty ? cyclesInBatch * 5 : cyclesInBatch * 6;
          const focusAngle = focusAreas[idx % focusAreas.length];

          const prompt = `Topic/Theme: "${theme.trim()}" (Focus Area: ${focusAngle}).
Generate exactly ${totalInBatch} unique questions (${mcqInBatch} MCQs and ${numInBatch} Number Estimates) in the required repeating cycle.
Keep explanations concise and punchy (1-2 sentences).
${idx === 0 ? 'Also provide an engaging title and 1-2 sentence description for the quiz.' : ''}`;

          return generateWithFallback(ai, prompt, systemPrompt, schema);
        });

        const batchResults = await Promise.all(batchPromises);

        for (let i = 0; i < batchResults.length; i++) {
          const res = batchResults[i];
          if (i === 0) {
            if (res.title) quizTitle = res.title;
            if (res.description) quizDescription = res.description;
          }
          if (Array.isArray(res.questions)) {
            allQuestions.push(...res.questions);
          }
        }
      }

      // Sanitize and enforce schema invariants
      const cleanedQuestions = sanitizeQuestions(allQuestions, answerChoiceCount);
      const validationReport = validateQuizDataset(cleanedQuestions, cycleCount);

      const generatedQuiz = {
        id: `ai-${Date.now()}`,
        theme: theme.trim(),
        title: quizTitle || `${theme.trim()} Interactive Quiz`,
        description: quizDescription || `Custom interactive quiz exploring ${theme.trim()}.`,
        difficulty: difficulty,
        answerChoiceCount,
        questions: cleanedQuestions,
        createdAt: new Date().toISOString(),
        validationReport,
      };

      res.json(generatedQuiz);
    } catch (error: any) {
      console.error('Quiz Generation Error:', error);
      res.status(500).json({
        error: error.message || 'An unexpected error occurred while generating the quiz.',
      });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Quiz Generator for YouTube server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
