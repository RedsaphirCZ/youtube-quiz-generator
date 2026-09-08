import { QuizDataset } from '../types';

export interface QuizPromptConfig {
  theme: string;
  cycles: number;
  difficulty: 'easy' | 'moderate' | 'challenging';
  answerChoiceCount: 2 | 3;
}

export interface QuizResearchPromptConfig {
  topic: string;
  questionCount: number;
  difficulty: 'easy' | 'easy-medium' | 'medium' | 'challenging';
  answerChoiceCount: 2 | 3;
  includeNumberGuesses: boolean;
  numberGuessCount: number;
  currentInformation: boolean;
  language: string;
  specialInstructions: string;
}

export function generateQuizResearchPromptMarkdown(config: QuizResearchPromptConfig): string {
  const topic = config.topic.trim();
  const questionCount = Math.max(1, Math.round(config.questionCount));
  const numberGuessCount = config.includeNumberGuesses
    ? Math.min(questionCount, Math.max(1, Math.round(config.numberGuessCount)))
    : 0;
  const mcqCount = questionCount - numberGuessCount;
  const optionLetters = config.answerChoiceCount === 2 ? 'A and B' : 'A, B, and C';
  const currentRule = config.currentInformation
    ? 'This topic involves current information. Verify every time-sensitive fact with current authoritative sources and include a verified_as_of date.'
    : 'Avoid facts likely to change soon. If a fact may have changed, verify it with a current authoritative source or replace it.';
  const special = config.specialInstructions.trim() || 'None.';

  return `# ASMR QUIZ RESEARCH AND CREATION BRIEF

Create a complete, researched, fact-checked quiz for a relaxing YouTube ASMR video.

This task is only about research and structured quiz data. Do not create HTML, CSS, JavaScript, interface elements, or layout.

## 1. FILLED QUIZ REQUIREMENTS

- Topic: ${topic}
- Exact length: ${questionCount} questions
- Difficulty: ${config.difficulty}
- Language: ${config.language.trim() || 'Simple natural English'}
- Audience: General YouTube audience listening to a relaxing ASMR quiz
- Answer format: Exactly ${config.answerChoiceCount} choices for every multiple-choice question
- Multiple-choice questions: Exactly ${mcqCount}
- Number-estimate questions: Exactly ${numberGuessCount}
- Current information involved: ${config.currentInformation ? 'Yes' : 'No'}
- Special themes or restrictions: ${special}

Do not silently change any of these requirements. Output exactly ${questionCount} questions.

## 2. RESEARCH BEFORE WRITING

Research the topic before constructing the quiz. Use reliable, authoritative sources such as official organizations, government sources, museums, universities, scientific organizations, recognized encyclopedias, and major historical institutions.

For every question:

1. Verify the intended answer.
2. Check that no distractor could also reasonably be correct.
3. Verify the explanation and any dates or measurements it contains.
4. Replace ambiguous, disputed, or weakly sourced facts.
5. Keep source URLs in the top-level verification metadata.

${currentRule}

## 3. ASMR QUESTION STYLE

- Questions must sound natural when read aloud once.
- Use short sentences, familiar words, and recognizable subjects.
- Target frequent moments of recognition rather than examination-style difficulty.
- Begin with approachable questions and avoid sudden difficulty spikes.
- Test one clear idea per question.
- Avoid trick questions, negative stems, double negatives, academic wording, and unnecessary setup.
- Keep dates and measurements mainly in explanations unless they are the fact being tested.
- Use varied angles on the topic and avoid duplicate or near-duplicate facts.
- Check that one question or explanation does not reveal a later answer.

## 4. ANSWERS AND EXPLANATIONS

- Every MCQ must contain exactly ${config.answerChoiceCount} concise, plausible, parallel options.
- Keep most options under five words.
- Use distractors from the same category and level of specificity as the answer.
- Never use joke answers, All of the above, None of the above, answer labels, hints, or explanations inside options.
- Balance correct positions approximately evenly across ${optionLetters}, without a repeating pattern or long runs.
- Every explanation should use 2–3 short, simple sentences, usually 20–50 words.
- Explanations must confirm the answer, explain why, and add one useful verified fact.

${numberGuessCount > 0
    ? `Create exactly ${numberGuessCount} dedicated number-estimate questions. Use a numeric target and a separate metricUnit. Do not disguise number guessing as multiple choice.`
    : 'Do not create number-guessing questions or numerical multiple-choice questions.'}

## 5. REQUIRED APP-COMPATIBLE JSON

Return only one valid JSON object. Do not use Markdown fences or add commentary before or after it.

Use this exact structure:

{
  "id": "short-lowercase-topic-id",
  "theme": "${topic}",
  "title": "Engaging quiz title",
  "description": "One or two sentence description",
  "difficulty": "${config.difficulty}",
  "answerChoiceCount": ${config.answerChoiceCount},
  "verification": {
    "sources": ["SOURCE URL"],
    "verified_as_of": "YYYY-MM-DD"
  },
  "questions": [
    {
      "type": "mcq",
      "question": "Question text",
      "options": [${Array.from({ length: config.answerChoiceCount }, (_, index) => `"Option ${String.fromCharCode(65 + index)}"`).join(', ')}],
      "correctIndex": 0,
      "explanation": "Two or three short, easy sentences"
    }${numberGuessCount > 0 ? `,
    {
      "type": "number",
      "question": "About how large, old, fast, tall, or numerous is this?",
      "target": 123,
      "metricUnit": "unit",
      "imperialDisplay": "optional alternate display",
      "explanation": "Two or three short, easy sentences"
    }` : ''}
  ]
}

correctIndex uses 0 for A, 1 for B, and${config.answerChoiceCount === 3 ? ' 2 for C' : ' no value above 1'}.

## 6. FINAL AUDIT BEFORE RETURNING

Confirm all of the following before returning the JSON:

- Exactly ${questionCount} complete questions
- Exactly ${mcqCount} MCQs and ${numberGuessCount} number estimates
- Exactly ${config.answerChoiceCount} options per MCQ
- Correct answers and explanations verified against the listed sources
- No ambiguous answers, weak distractors, duplicate facts, or cross-question leakage
- Simple spoken English and concise options
- Balanced answer positions with no obvious sequence
- No placeholders, TODOs, missing explanations, or unfinished questions
- Valid JSON matching the required app schema
`;
}

export function getExpectedQuizCounts(cycles: number) {
  const compactTwenty = cycles === 4;
  return {
    total: compactTwenty ? 20 : cycles * 6,
    mcq: compactTwenty ? cycles * 4 : cycles * 5,
    number: cycles,
    compactTwenty,
  };
}

export function generateQuizCreationPrompt(config: QuizPromptConfig): string {
  const counts = getExpectedQuizCounts(config.cycles);
  const optionIndexes = config.answerChoiceCount === 2 ? '0 or 1' : '0, 1, or 2';
  const pattern = counts.compactTwenty
    ? 'four cycles of 4 multiple-choice questions followed by 1 number-estimate question'
    : `${config.cycles} cycles of 5 multiple-choice questions followed by 1 number-estimate question`;

  return `Create a high-accuracy YouTube quiz about "${config.theme.trim()}".

Return ONLY one valid JSON object. Do not use Markdown fences, commentary, citations, or text before or after the JSON.

REQUIRED FORMAT
- Exactly ${counts.total} questions: ${counts.mcq} multiple-choice and ${counts.number} number-estimate questions.
- Order them as ${pattern}.
- Difficulty: ${config.difficulty}.
- Every multiple-choice question must have exactly ${config.answerChoiceCount} distinct, plausible options.
- correctIndex must be ${optionIndexes} and point to the factually correct option.
- Balance correct answers evenly across ${config.answerChoiceCount === 2 ? 'A and B' : 'A, B, and C'}.
- Options must be concise and must not contain brackets, translations, answer labels, hints, or explanations.
- Do not reveal the answer in the question. Do not use joke, giveaway, "all of the above," or duplicate options.
- Number questions must ask for a real-world factual estimate, never a calculation. target must be a JSON number and metricUnit must be separate.
- Give every question a concise, interesting, factually careful explanation of 1-2 sentences.
- Avoid duplicated facts, disputed claims, and facts likely to change soon. Check facts carefully before returning the JSON.

Use this exact object shape:
{
  "id": "short-lowercase-topic-id",
  "theme": "${config.theme.trim()}",
  "title": "Engaging quiz title",
  "description": "One or two sentence description",
  "difficulty": "${config.difficulty}",
  "answerChoiceCount": ${config.answerChoiceCount},
  "questions": [
    {
      "type": "mcq",
      "question": "Question text",
      "options": [${Array.from({ length: config.answerChoiceCount }, (_, index) => `"Option ${String.fromCharCode(65 + index)}"`).join(', ')}],
      "correctIndex": 0,
      "explanation": "Why the answer is correct"
    },
    {
      "type": "number",
      "question": "Estimate question text",
      "target": 123,
      "metricUnit": "unit",
      "imperialDisplay": "optional alternate display",
      "explanation": "Why this number matters"
    }
  ]
}`;
}

function extractJsonObject(rawText: string): unknown {
  const cleaned = rawText
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start < 0 || end <= start) {
    throw new Error('No complete JSON object was found in the pasted response.');
  }
  return JSON.parse(cleaned.slice(start, end + 1));
}

export function parseFlexibleQuizResponse(rawText: string): {
  quiz: QuizDataset;
  cycles?: number;
  answerChoiceCount: 2 | 3;
} {
  const parsed = extractJsonObject(rawText) as Partial<QuizDataset> & { topic?: string };
  if (!parsed || !Array.isArray(parsed.questions) || parsed.questions.length === 0) {
    throw new Error('The imported file needs a non-empty questions array.');
  }

  const mcqQuestions = parsed.questions.filter((question) => question.type === 'mcq');
  if (mcqQuestions.length === 0) {
    throw new Error('The imported quiz needs multiple-choice questions.');
  }

  const optionCounts = new Set(mcqQuestions.map((question) =>
    Array.isArray(question.options) ? question.options.length : 0
  ));
  if (optionCounts.size !== 1 || !optionCounts.has(2) && !optionCounts.has(3)) {
    throw new Error('Every multiple-choice question must consistently use either 2 or 3 answer choices.');
  }

  const answerChoiceCount = [...optionCounts][0] as 2 | 3;
  const questionCount = parsed.questions.length;
  const followsPattern = (cycleLength: number, mcqsPerCycle: number) => parsed.questions?.every(
    (question, index) => index % cycleLength < mcqsPerCycle ? question.type === 'mcq' : question.type === 'number'
  );
  const cycles = questionCount === 20 && followsPattern(5, 4)
    ? 4
    : questionCount > 0 && questionCount % 6 === 0 && followsPattern(6, 5)
      ? questionCount / 6
      : undefined;

  const difficulty = parsed.difficulty === 'easy' || parsed.difficulty === 'challenging'
    ? parsed.difficulty
    : 'moderate';
  const theme = String(parsed.theme || parsed.topic || parsed.title || 'Imported Quiz').trim();

  return {
    quiz: normalizeGeneratedQuiz(parsed, { theme, cycles, difficulty, answerChoiceCount }),
    cycles,
    answerChoiceCount,
  };
}

function normalizeGeneratedQuiz(
  parsed: Partial<QuizDataset> & { topic?: string },
  config: QuizPromptConfig
): QuizDataset {
  if (!parsed || !Array.isArray(parsed.questions) || parsed.questions.length === 0) {
    throw new Error('The JSON needs a non-empty questions array.');
  }

  const wrongChoiceQuestion = parsed.questions.findIndex(
    (question) => question.type === 'mcq'
      && (!Array.isArray(question.options) || question.options.length !== config.answerChoiceCount)
  );
  if (wrongChoiceQuestion >= 0) {
    throw new Error(
      `Question ${wrongChoiceQuestion + 1} does not have exactly ${config.answerChoiceCount} answer choices.`
    );
  }

  const title = String(parsed.title || parsed.theme || config.theme).trim();
  const theme = String(parsed.theme || parsed.topic || config.theme).trim();
  const safeIdBase = String(parsed.id || title || theme)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64) || 'imported-quiz';

  return {
    ...parsed,
    id: `${safeIdBase}-${Date.now()}`,
    theme,
    title,
    description: String(parsed.description || `A ${config.difficulty} quiz about ${theme}.`),
    difficulty: config.difficulty,
    answerChoiceCount: config.answerChoiceCount,
    questions: parsed.questions,
    createdAt: new Date().toISOString(),
    validated: false,
    agentValidation: undefined,
  } as QuizDataset;
}

export function parseGeneratedQuizResponse(
  rawText: string,
  config: QuizPromptConfig
): QuizDataset {
  const parsed = extractJsonObject(rawText) as Partial<QuizDataset> & { topic?: string };
  return normalizeGeneratedQuiz(parsed, config);
}
