import { countryAssetPath, countryCatalog, findCountry } from './countryAssets';
import { PicturePromptConfig, PictureQuestion, PictureQuizCategory, PictureQuizDataset } from './types';

export const PICTURE_QUESTION_TYPES = {
  picture_mcq: true,
} as const;

const CATEGORIES = new Set<PictureQuizCategory>([
  'brands', 'country-shapes', 'emoji', 'flags', 'landmarks', 'people', 'objects', 'custom',
]);

const slugify = (value: string) => value
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')
  .slice(0, 64) || 'picture-quiz';

const TWEMOJI_CDN_BASE = 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg';

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

const toReliableTwemojiUrl = (value: string) => {
  try {
    const url = new URL(value);
    if (url.hostname.toLowerCase() !== 'commons.wikimedia.org') return value;
    const path = decodeURIComponent(url.pathname);
    const twemojiFile = path.match(/^\/wiki\/(?:Special:FilePath\/|File:)Twemoji(?:14)?_([0-9a-f-]+)\.svg$/i);
    if (!twemojiFile) return value;
    return `${TWEMOJI_CDN_BASE}/${twemojiFile[1].toLowerCase()}.svg`;
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
  return toReliableTwemojiUrl(toDirectCommonsImageUrl(src));
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
    if (!Object.hasOwn(PICTURE_QUESTION_TYPES, type)) {
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
    let src = resolveImageSource(originalSrc, assets);
    let alt = String(rawImage.alt || rawImage.imageAlt || rawImage.image_alt || rawImage.description || raw.imageAlt || raw.image_alt || '').trim();
    const options = Array.isArray(raw.options) ? raw.options.map((option: unknown) => String(option).trim()) : [];
    const correctIndex = Number(raw.correctIndex);
    const isCountry = category === 'flags' || category === 'country-shapes';
    const requestedCode = String(rawImage.countryCode || raw.countryCode || '').trim();
    const country = isCountry ? findCountry(requestedCode || String(options[correctIndex] || '')) : undefined;
    // Preserve uploaded/embedded pictures; resolve country references ahead of AI URLs.
    const countryCode = isCountry && (requestedCode || !src.startsWith('data:')) ? country?.iso2 || requestedCode : undefined;
    if (countryCode && !src.startsWith('data:image/')) {
      src = countryAssetPath(countryCode, category);
      alt ||= category === 'flags' ? 'An unlabeled national flag' : 'An unlabeled country silhouette';
    }
    const searchHint = String(rawImage.searchHint || raw.imageSearch || '').trim();
    alt ||= searchHint || 'Quiz picture';


    if (!question) throw new Error(`Question ${index + 1} needs question text.`);
    if (src && !isSafeImageSource(src)) throw new Error(`Question ${index + 1} uses an unsupported image source. Use HTTPS, an image data URL, or a relative filename.`);
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
        countryCode,
        searchHint: searchHint || undefined,
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
  const countryMode = ['flags', 'country-shapes'].includes(config.category);
  const image = countryMode
    ? { countryCode: 'JP', alt: config.category === 'flags' ? 'An unlabeled national flag' : 'An unlabeled country silhouette' }
    : { src: 'question-01.png', alt: 'Neutral description without the answer', searchHint: 'Describe the exact subject the user should find or photograph' };
  return `# PICTURE QUIZ RESEARCH BRIEF

Create a visual-recognition quiz. The app supplies or matches the pictures; do not invent image URLs.

- Quiz name: ${config.title.trim()}
- Topic: ${config.topic.trim()}
- Category: ${config.category}
- Exact length: ${config.questionCount} questions
- Difficulty: ${config.difficulty}
- Answer choices: Exactly ${config.answerChoiceCount} per question
- Special instructions: ${config.specialInstructions.trim() || 'None.'}

## Pictures
${countryMode ? `Use image.countryCode with an ISO 3166-1 alpha-2 code from the supported list below. The app bundles flags and country silhouettes or map outlines. No URLs or downloads are required. The code MUST identify the country named by options[correctIndex]. Do not include image.src.
Supported countries: ${countryCatalog.map(c => `${c.iso2.toUpperCase()}=${c.name}`).join('; ')}` : `The user will upload pictures in the review screen. Use filenames question-01.png, question-02.png, etc., and image.searchHint describing the intended subject. Do not supply remote URLs, fabricated filenames from websites, or claim to have verified images. Choose subjects the user can reasonably illustrate. Provide neutral alt text without giving away the answer. Image matching is completed by the user after import.`}

## Questions
Use only picture_mcq. Give exactly ${config.answerChoiceCount} distinct plausible options, one correctIndex, and a short fact-checked explanation. Vary correct-answer positions. Avoid questions requiring details that cannot be seen in the intended picture. ${countryMode ? 'Use country names as answers, not capitals or regions.' : 'Avoid watermarks, visible answer text, and ambiguous subjects.'}

## Required JSON
Return one valid JSON object:
${JSON.stringify({schema:'picture-quiz/v1', title:config.title.trim(), category:config.category, questions:[{type:'picture_mcq', question:countryMode ? 'Which country is shown?' : 'What does this picture show?', image, options:countryMode ? ['Japan','Sweden','Canada'].slice(0,config.answerChoiceCount) : ['Option A','Option B','Option C'].slice(0,config.answerChoiceCount), correctIndex:0, explanation:'A short verified explanation.'}]},null,2)}

Before returning: check the exact title, length, distinct options, every correctIndex${countryMode ? ', and that every countryCode matches the correct answer' : ', and a useful image searchHint for every question'}. The example is a schema illustration; create the requested complete quiz.`;
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

export const countryShapeDemo: PictureQuizDataset = {
  schema: 'picture-quiz/v1', id: 'country-shapes-demo', title: 'Country Shapes Starter',
  description: 'Three bundled silhouettes, no image links needed.', category: 'country-shapes', createdAt: '2026-09-17T00:00:00.000Z',
  questions: [
    { type:'picture_mcq', question:'Which country is this?', image:{countryCode:'it',src:countryAssetPath('it','country-shapes'),alt:'An unlabeled country silhouette'}, options:['Italy','France','Spain'],correctIndex:0,explanation:'This outline shows Italy, including Sicily and Sardinia.' },
    { type:'picture_mcq', question:'Which country is this?', image:{countryCode:'br',src:countryAssetPath('br','country-shapes'),alt:'An unlabeled country silhouette'}, options:['Argentina','Brazil','Colombia'],correctIndex:1,explanation:'This outline shows Brazil.' },
    { type:'picture_mcq', question:'Which country is this?', image:{countryCode:'jp',src:countryAssetPath('jp','country-shapes'),alt:'An unlabeled country silhouette'}, options:['Indonesia','Philippines','Japan'],correctIndex:2,explanation:'This outline shows Japan.' },
  ],
};
