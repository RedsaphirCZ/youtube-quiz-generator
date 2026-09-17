import { PicturePromptConfig, PictureQuestion, PictureQuizCategory, PictureQuizDataset } from './types';

export const PICTURE_QUESTION_TYPES = {
  picture_mcq: true,
} as const;

const CATEGORIES = new Set<PictureQuizCategory>([
  'brands', 'country-shapes', 'flags', 'landmarks', 'people', 'objects', 'custom',
]);

const slugify = (value: string) => value
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')
  .slice(0, 64) || 'picture-quiz';

const extractJsonObject = (rawText: string): unknown => {
  const cleaned = rawText.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start < 0 || end <= start) throw new Error('No complete JSON object was found.');
  return JSON.parse(cleaned.slice(start, end + 1));
};

const toDirectCommonsImageUrl = (value: string) => {
  try {
    const url = new URL(value);
    if (url.hostname.toLowerCase() !== 'commons.wikimedia.org') return value;
    const filePage = url.pathname.match(/^\/wiki\/File:(.+)$/i);
    if (!filePage) return value;
    const fileName = decodeURIComponent(filePage[1]).replace(/_/g, ' ');
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}`;
  } catch {
    return value;
  }
};

const normalizeImageSource = (value: unknown) => {
  let src = String(value || '').trim();
  const markdownImage = src.match(/^!\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)$/);
  if (markdownImage) src = markdownImage[1];
  if (/^<[^<>]+>$/.test(src)) src = src.slice(1, -1).trim();
  if (src.startsWith('//')) src = `https:${src}`;
  return toDirectCommonsImageUrl(src);
};

const isCommonsFilePage = (value: unknown) => /^https?:\/\/commons\.wikimedia\.org\/wiki\/File:/i.test(String(value || '').trim());

const isSafeImageSource = (value: string) => {
  const src = value.trim();
  if (!src || /[\u0000-\u001f<>]/.test(src)) return false;
  if (/^(https?:\/\/|data:image\/(?:png|jpe?g|webp|gif|svg\+xml)[;,]|blob:)/i.test(src)) return true;
  // A path with no URI scheme is a browser-relative or locally selected asset.
  return !/^[a-z][a-z0-9+.-]*:/i.test(src) && !src.startsWith('#');
};

const resolveImageSource = (src: string, assets: Map<string, string>) => {
  const normalized = src.replace(/\\/g, '/');
  const basename = normalized.split('/').pop() || normalized;
  return assets.get(normalized) || assets.get(basename) || src;
};

export function parsePictureQuizResponse(rawText: string, assets = new Map<string, string>()): PictureQuizDataset {
  const parsed = extractJsonObject(rawText) as Record<string, unknown>;
  if (!parsed || !Array.isArray(parsed.questions) || parsed.questions.length === 0) {
    throw new Error('The picture quiz needs a non-empty questions array.');
  }

  const title = String(parsed.title || '').trim();
  if (!title) throw new Error('The picture quiz needs a title.');
  const rawCategory = String(parsed.category || 'custom').trim() as PictureQuizCategory;
  const category = CATEGORIES.has(rawCategory) ? rawCategory : 'custom';

  let expectedOptionCount: number | undefined;
  const questions = parsed.questions.map((rawQuestion, index): PictureQuestion => {
    const raw = rawQuestion as Record<string, any>;
    const type = String(raw?.type || '').trim();
    if (!(type in PICTURE_QUESTION_TYPES)) {
      throw new Error(`Question ${index + 1} uses unsupported picture type "${type || 'missing'}".`);
    }

    const question = String(raw.question || '').trim();
    const explanation = String(raw.explanation || '').trim();
    const rawImage = raw.image && typeof raw.image === 'object' ? raw.image : {};
    const sourcePageCandidate = rawImage.sourceUrl || rawImage.source_url || raw.imageSourceUrl || raw.image_source_url;
    const originalSrc = normalizeImageSource(
      typeof raw.image === 'string' ? raw.image :
        rawImage.src || rawImage.url || rawImage.imageUrl || rawImage.image_url || rawImage.path || rawImage.file ||
        raw.imageSrc || raw.image_src || raw.imageUrl || raw.image_url || raw.imagePath || raw.image_path || raw.src ||
        (isCommonsFilePage(sourcePageCandidate) ? sourcePageCandidate : ''),
    );
    const src = resolveImageSource(originalSrc, assets);
    const alt = String(rawImage.alt || rawImage.imageAlt || rawImage.image_alt || rawImage.description || raw.imageAlt || raw.image_alt || '').trim();
    const options = Array.isArray(raw.options) ? raw.options.map((option: unknown) => String(option).trim()) : [];
    const correctIndex = Number(raw.correctIndex);

    if (!question) throw new Error(`Question ${index + 1} needs question text.`);
    if (!originalSrc) throw new Error(`Question ${index + 1} needs an image source. Use image.src, image.url, image_url, or a relative filename.`);
    if (!isSafeImageSource(src)) throw new Error(`Question ${index + 1} uses an unsupported image source. Use HTTPS, an image data URL, or a relative filename.`);
    if (!alt) throw new Error(`Question ${index + 1} needs image alt text.`);
    if (![2, 3].includes(options.length) || options.some((option: string) => !option) || new Set(options.map((option: string) => option.toLowerCase())).size !== options.length) {
      throw new Error(`Question ${index + 1} needs 2 or 3 distinct, non-empty options.`);
    }
    expectedOptionCount ??= options.length;
    if (options.length !== expectedOptionCount) throw new Error('All picture questions must use the same number of answer choices.');
    if (!Number.isInteger(correctIndex) || correctIndex < 0 || correctIndex >= options.length) {
      throw new Error(`Question ${index + 1} has an invalid correctIndex.`);
    }
    if (!explanation) throw new Error(`Question ${index + 1} needs an explanation.`);

    const sourceUrl = String(sourcePageCandidate || '').trim();
    return {
      type: 'picture_mcq',
      question,
      image: {
        src,
        alt,
        credit: String(rawImage.credit || raw.imageCredit || '').trim() || undefined,
        sourceUrl: /^https?:\/\//i.test(sourceUrl) ? sourceUrl : undefined,
      },
      options: options as [string, string] | [string, string, string],
      correctIndex: correctIndex as 0 | 1 | 2,
      explanation,
    };
  });

  return {
    schema: 'picture-quiz/v1',
    id: `${slugify(String(parsed.id || title))}-${Date.now()}`,
    title,
    description: String(parsed.description || `A picture quiz about ${title}.`).trim(),
    category,
    questions,
    createdAt: new Date().toISOString(),
  };
}

export function generatePictureQuizPrompt(config: PicturePromptConfig): string {
  const categoryGuidance: Record<PictureQuizCategory, string> = {
    brands: 'Use recognizable brand marks or products without answer text visible in the image.',
    'country-shapes': 'Use clean country silhouettes or map outlines with no labels, flags, or neighboring-country clues.',
    flags: 'Use accurate flag images with no captions.',
    landmarks: 'Use clear landmark photographs that do not contain giveaway captions.',
    people: 'Use appropriately licensed portraits and avoid sensitive or private-person identification.',
    objects: 'Use clear object photographs on uncluttered backgrounds.',
    custom: 'Choose images that test visual recognition and do not reveal the answer in visible text.',
  };
  const optionExample = Array.from({ length: config.answerChoiceCount }, (_, index) => `"Option ${String.fromCharCode(65 + index)}"`).join(', ');

  return `# PICTURE QUIZ RESEARCH AND ASSET BRIEF

Create an import-ready visual quiz for a YouTube quiz video.

## Requirements

- Quiz name: ${config.title.trim()}
- Topic: ${config.topic.trim()}
- Category: ${config.category}
- Exact length: ${config.questionCount} questions
- Difficulty: ${config.difficulty}
- Answer choices: Exactly ${config.answerChoiceCount} per question
- Special instructions: ${config.specialInstructions.trim() || 'None.'}

${categoryGuidance[config.category]}

## Image rules

1. Every question must use a direct HTTPS image URL that a browser can display, not a search-results or webpage URL.
2. Prefer Wikimedia Commons or another source that clearly permits reuse. Put the file page in sourceUrl and the attribution in credit.
3. Verify that every direct image URL loads before returning the JSON.
4. Provide useful alt text that describes the image without stating the answer.
5. Do not use watermarked, low-resolution, misleading, or answer-revealing images.
6. For local assets, you may instead use a relative filename such as "images/question-01.png". The user can select the JSON and image files together when importing.

## Question rules

- Use only the declared type "picture_mcq".
- Ask one clear visual-recognition question per image.
- Use concise, parallel, plausible options and one unambiguous correct answer.
- Balance correctIndex positions and avoid a visible pattern.
- Give a short factual explanation. Verify factual claims and avoid facts likely to change.

## Required JSON

Return only one valid JSON object, with no Markdown fence or commentary:

{
  "schema": "picture-quiz/v1",
  "id": "short-lowercase-id",
  "title": ${JSON.stringify(config.title.trim())},
  "description": "One sentence description",
  "category": "${config.category}",
  "questions": [
    {
      "type": "picture_mcq",
      "question": "What does this picture show?",
      "image": {
        "src": "https://direct-image-url.example/image.jpg",
        "alt": "Neutral description without the answer",
        "credit": "Creator, license",
        "sourceUrl": "https://source-page.example/file"
      },
      "options": [${optionExample}],
      "correctIndex": 0,
      "explanation": "A short verified explanation."
    }
  ]
}

Before returning, confirm the exact title and question count, load every image URL, check licensing/credit, and validate every correctIndex.`;
}

const svgDataUrl = (body: string) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(body)}`;

export const pictureQuizDemo: PictureQuizDataset = {
  schema: 'picture-quiz/v1',
  id: 'picture-mode-demo',
  title: 'Three Flags, Three Countries',
  description: 'A small offline demo showing how image questions work.',
  category: 'flags',
  createdAt: '2026-09-17T00:00:00.000Z',
  questions: [
    {
      type: 'picture_mcq', question: 'Which country uses this flag?',
      image: { src: svgDataUrl('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect width="3" height="2" fill="white"/><circle cx="1.5" cy="1" r=".6" fill="#bc002d"/></svg>'), alt: 'A white flag with a centered red circle' },
      options: ['Japan', 'Bangladesh', 'Palau'], correctIndex: 0,
      explanation: 'Japan’s national flag has a crimson disc representing the sun on a white field.',
    },
    {
      type: 'picture_mcq', question: 'Which country uses this flag?',
      image: { src: svgDataUrl('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10"><rect width="16" height="10" fill="#006aa7"/><path fill="#fecc00" d="M5 0h2v10H5zM0 4h16v2H0z"/></svg>'), alt: 'A blue flag with a yellow Nordic cross' },
      options: ['Finland', 'Sweden', 'Norway'], correctIndex: 1,
      explanation: 'Sweden’s flag has a yellow Nordic cross on a blue field.',
    },
    {
      type: 'picture_mcq', question: 'Which country uses this square flag?',
      image: { src: svgDataUrl('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#d52b1e"/><path fill="white" d="M13 6h6v7h7v6h-7v7h-6v-7H6v-6h7z"/></svg>'), alt: 'A square red flag with a white cross' },
      options: ['Denmark', 'Switzerland', 'Georgia'], correctIndex: 1,
      explanation: 'Switzerland uses a square red flag with a centered white cross.',
    },
  ],
};
