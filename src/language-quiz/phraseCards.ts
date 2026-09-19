import { languages, languageName, languageDirection } from './languageQuiz';
import type { LanguageCode } from './languageQuiz';

export const phraseProfiles: Record<LanguageCode, { variety: string; flags: string[] }> = {
  en: { variety: 'British English', flags: ['gb'] }, ja: { variety: 'Standard Japanese', flags: ['jp'] },
  de: { variety: 'Standard German (Germany)', flags: ['de'] }, ar: { variety: 'Modern Standard Arabic', flags: ['sa', 'ae', 'eg'] },
  nl: { variety: 'Standard Dutch (Netherlands)', flags: ['nl'] }, no: { variety: 'Norwegian Bokmål; Urban East Norwegian pronunciation', flags: ['no'] },
  el: { variety: 'Standard Modern Greek', flags: ['gr'] }, fi: { variety: 'Standard Finnish', flags: ['fi'] }, sv: { variety: 'Central Standard Swedish', flags: ['se'] },
  ko: { variety: 'Standard Korean (Seoul)', flags: ['kr'] }, da: { variety: 'Standard Danish', flags: ['dk'] }, pl: { variety: 'Standard Polish', flags: ['pl'] },
  hr: { variety: 'Standard Croatian', flags: ['hr'] }, es: { variety: 'Standard Spanish (Spain)', flags: ['es'] }, fr: { variety: 'Standard French (France)', flags: ['fr'] },
  it: { variety: 'Standard Italian', flags: ['it'] }, pt: { variety: 'European Portuguese', flags: ['pt'] }, hu: { variety: 'Standard Hungarian', flags: ['hu'] },
  he: { variety: 'Modern Israeli Hebrew', flags: ['il'] }, ro: { variety: 'Standard Romanian (Romania)', flags: ['ro'] },
  tr: { variety: 'Standard Turkish (Turkey)', flags: ['tr'] }, cs: { variety: 'Standard Czech', flags: ['cz'] }, sk: { variety: 'Standard Slovak', flags: ['sk'] }, sl: { variety: 'Standard Slovenian', flags: ['si'] },
};
export type PhraseBackgroundMode = 'set' | 'language';
export interface PhraseDesign { backgroundMode: PhraseBackgroundMode; setColor: string }
export interface PhraseCard { language: LanguageCode; phrase: string; ipa: string; czechPronunciation: string; variety: string }
export interface PhraseDeck {
  schema: 'phrase-flashcards/v1'; id: string; title: string; sourcePhrase: string; sourceLanguage: LanguageCode;
  context: string; cards: PhraseCard[]; design: PhraseDesign; createdAt: string; reviewed: false;
}
export interface PhraseConfig { title: string; phrase: string; sourceLanguage: LanguageCode; context: string }
export const defaultPhraseDesign: PhraseDesign = { backgroundMode: 'language', setColor: '#513a7a' };
export const phraseThemes: Record<LanguageCode, { background: string; accent: string; text: string }> = {
  en: { background: '#17365d', accent: '#f3c969', text: '#ffffff' }, ja: { background: '#fff4f2', accent: '#bc002d', text: '#2b1820' },
  de: { background: '#292929', accent: '#f4c542', text: '#ffffff' }, ar: { background: '#12684a', accent: '#ffffff', text: '#ffffff' },
  nl: { background: '#244f87', accent: '#f26b5b', text: '#ffffff' }, no: { background: '#b4203b', accent: '#17365d', text: '#ffffff' },
  el: { background: '#2f6eb6', accent: '#ffffff', text: '#ffffff' }, fi: { background: '#f5f8fb', accent: '#245aa5', text: '#172033' },
  sv: { background: '#2368a2', accent: '#f6cf3f', text: '#ffffff' }, ko: { background: '#f7f2ed', accent: '#c83b45', text: '#221f2a' },
  da: { background: '#b5233d', accent: '#ffffff', text: '#ffffff' }, pl: { background: '#fff2f5', accent: '#d42155', text: '#301c24' },
  hr: { background: '#245caa', accent: '#df3045', text: '#ffffff' }, es: { background: '#b52b32', accent: '#f3c84b', text: '#ffffff' },
  fr: { background: '#263f78', accent: '#e3454f', text: '#ffffff' }, it: { background: '#1f7656', accent: '#f4f1e8', text: '#ffffff' },
  pt: { background: '#1e6a4b', accent: '#f1c644', text: '#ffffff' }, hu: { background: '#9d2940', accent: '#2f7654', text: '#ffffff' },
  he: { background: '#f4f7ff', accent: '#315cbd', text: '#17233f' }, ro: { background: '#f3d84b', accent: '#164e9b', text: '#20233a' },
  tr: { background: '#c8233d', accent: '#ffffff', text: '#ffffff' }, cs: { background: '#244f87', accent: '#d94a55', text: '#ffffff' },
  sk: { background: '#f4f7fb', accent: '#245aa5', text: '#1d2940' }, sl: { background: '#2767a7', accent: '#e6eef8', text: '#ffffff' },
};
const required = (value: unknown, label: string, limit = 500) => {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > limit) throw new Error(`${label} needs 1–${limit} characters.`);
  return value.trim();
};
const isObject = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);
const code = (value: unknown): LanguageCode => {
  if (!languages.some(item => item[0] === value)) throw new Error(`Unsupported language code: ${String(value)}.`);
  return value as LanguageCode;
};
const color = (value: unknown) => typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value) ? value.toLowerCase() : defaultPhraseDesign.setColor;
const contrast = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map(index => Number.parseInt(hex.slice(index, index + 2), 16));
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? '#172033' : '#ffffff';
};
export function phraseCardTheme(deck: Pick<PhraseDeck, 'design'>, language: LanguageCode) {
  if (deck.design.backgroundMode === 'language') return phraseThemes[language];
  const text = contrast(deck.design.setColor);
  return { background: deck.design.setColor, accent: text, text };
}

export function generatePhrasePrompt(config: PhraseConfig): string {
  const phrase = required(config.phrase, 'Phrase', 240);
  const title = required(config.title, 'Deck name', 120);
  return `# Translate one phrase into ${languages.length} language flashcards

Source phrase: ${JSON.stringify(phrase)}
Source language: ${languageName(config.sourceLanguage)} (${config.sourceLanguage})
Context, meaning and register: ${config.context.trim() || 'Use a natural, neutral-polite everyday interpretation. State your chosen context in context.'}
Deck title: ${JSON.stringify(title)} (preserve exactly)

Translate this SAME phrase into EVERY language below, including the source language. Return exactly one card per code, in this order:
${languages.map(([language, name]) => `- ${language}: ${name}; ${phraseProfiles[language].variety}`).join('\n')}

Requirements:
- Preserve the intended meaning, tense, politeness and speaker/listener context across all ${languages.length} translations. Prefer natural phrasing over word-for-word translation.
- Use the specified standard varieties. Do not mix Brazilian/European Portuguese or unrelated Arabic dialects. Norwegian text uses Bokmål, with Urban East Norwegian pronunciation.
- phrase is the translated phrase in the language's native script, without quotes, language labels, parenthetical translations or romanization. It appears ALONE on the card front and repeats on the back.
- ipa is the International Phonetic Alphabet pronunciation of the ENTIRE translated phrase, in /slashes/ or [brackets]. Use genuine IPA symbols, stress, length and tone where relevant, not English respelling or romanization. It must match the exact phrase and named variety.
- czechPronunciation is a separate, practical guide showing how a Czech speaker should read the ENTIRE phrase aloud. It is pronunciation guidance, never a Czech translation and never IPA.
- Write czechPronunciation with normal Czech spelling conventions. Use Czech letters and diacritics carefully where they help: á, é, í, ó, ú/ů, ý, š, č, ž, ň, ť, ď, ř, ch and dž. Remember that Czech j sounds like English y; Czech y and i represent the same vowel quality, so choose i/í or y/ý consistently for readability rather than copying foreign spelling. Use hyphens only when they genuinely make syllables clearer.
- Make the Czech guide reproduce the named variety as closely as Czech spelling reasonably allows. Preserve long vowels, consonant softness, stress and difficult sounds. If Czech has no exact equivalent, choose the closest readable Czech approximation; do not fall back to English-style respelling, raw romanization or a second IPA string.
- Check every translation, IPA transcription and Czech-reader guide against reliable dictionaries or pronunciation references. Never invent a pronunciation. Derive the Czech guide from the verified pronunciation, not from spelling alone. If uncertain, resolve it before returning the complete deck.
- Each back displays the same phrase, language name, representative country flags and IPA. The app supplies flags from its bundled assets; do not supply image links or emoji flags.
- The deck is an unreviewed draft for a human language check. IPA shape validation cannot establish phonetic accuracy.
- No extra languages, duplicate cards or missing cards. Escape JSON correctly. Keep sourcePhrase exactly as provided.

Return ONLY valid JSON using this structure, replacing the example card with ALL ${languages.length} cards:
${JSON.stringify({ schema: 'phrase-flashcards/v1', title, sourcePhrase: phrase, sourceLanguage: config.sourceLanguage, context: config.context.trim() || 'Describe the intended everyday meaning and register', design: defaultPhraseDesign, cards: [{ language: 'en', phrase: 'Natural English translation', ipa: '/complete IPA transcription/', czechPronunciation: 'Český návod výslovnosti celé fráze', variety: phraseProfiles.en.variety }] }, null, 2)}
`;
}

export function parsePhraseDeck(raw: string, preserveIdentity = false): PhraseDeck {
  if (raw.length > 2 * 1024 * 1024) throw new Error('Use a JSON file smaller than 2 MB.');
  const parsed: unknown = JSON.parse(raw.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, ''));
  if (!isObject(parsed) || parsed.schema !== 'phrase-flashcards/v1') throw new Error('Use phrase-flashcards/v1 JSON from the phrase prompt.');
  if (!Array.isArray(parsed.cards) || parsed.cards.length !== languages.length) throw new Error(`The deck must contain exactly ${languages.length} cards, one for each language.`);
  const seen = new Set<string>();
  const cards = parsed.cards.map((item: unknown, i): PhraseCard => {
    if (!isObject(item)) throw new Error(`Card ${i + 1} must be an object.`);
    const language = code(item.language);
    if (seen.has(language)) throw new Error(`Duplicate language: ${languageName(language)}.`);
    seen.add(language);
    const ipa = required(item.ipa, `${languageName(language)} IPA`, 500);
    if (!/^(?:\/[^/\r\n]+\/|\[[^\[\]\r\n]+\])$/u.test(ipa) || !/[\p{L}]/u.test(ipa)) throw new Error(`${languageName(language)} needs a complete IPA transcription in /slashes/ or [brackets].`);
    const czechPronunciation = required(item.czechPronunciation, `${languageName(language)} Czech pronunciation`, 500);
    if (!/[\p{L}]/u.test(czechPronunciation)) throw new Error(`${languageName(language)} needs a Czech-reader pronunciation guide.`);
    return { language, phrase: required(item.phrase, `${languageName(language)} phrase`, 240), ipa, czechPronunciation, variety: required(item.variety, `${languageName(language)} variety`, 160) };
  });
  cards.sort((a, b) => languages.findIndex(item => item[0] === a.language) - languages.findIndex(item => item[0] === b.language));
  const designValue = isObject(parsed.design) ? parsed.design : {};
  const backgroundMode: PhraseBackgroundMode = designValue.backgroundMode === 'set' ? 'set' : 'language';
  return { schema: 'phrase-flashcards/v1', id: preserveIdentity ? required(parsed.id, 'ID') : `phrase-${crypto.randomUUID()}`,
    title: required(parsed.title, 'Deck name', 120), sourcePhrase: required(parsed.sourcePhrase, 'Source phrase', 240), sourceLanguage: code(parsed.sourceLanguage),
    context: typeof parsed.context === 'string' ? parsed.context.trim() : '', cards, design: { backgroundMode, setColor: color(designValue.setColor) },
    createdAt: preserveIdentity ? required(parsed.createdAt, 'Creation date') : new Date().toISOString(), reviewed: false };
}

const key = 'phrase-flashcard-library-v1';
export function loadPhraseLibrary(): PhraseDeck[] {
  const data: unknown = JSON.parse(localStorage.getItem(key) || '[]');
  if (!Array.isArray(data)) throw new Error('Saved phrase decks could not be read.');
  return data.flatMap(item => { try { return [parsePhraseDeck(JSON.stringify(item), true)]; } catch { return []; } });
}
export function savePhraseDeck(deck: PhraseDeck): PhraseDeck[] {
  const valid = parsePhraseDeck(JSON.stringify(deck), true);
  const decks = [valid, ...loadPhraseLibrary().filter(item => item.id !== valid.id)];
  localStorage.setItem(key, JSON.stringify(decks)); return decks;
}
export const flagPath = (country: string) => `picture-assets/flags/${country}.png`;
const escape = (value: string) => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]!));

/** Paired front/back rows preserve Unicode shaping in the browser and are easy to cut or fold. */
export function phraseDeckHTML(deck: PhraseDeck, flags: Record<string, string>): string {
  const rows = deck.cards.map(card => {
    const theme = phraseCardTheme(deck, card.language);
    const phrase = `<p class="phrase" lang="${card.language}" dir="${languageDirection(card.language)}">${escape(card.phrase)}</p>`;
    const images = phraseProfiles[card.language].flags.map(country => {
      const data = flags[country];
      if (!data || !/^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(data)) throw new Error(`Flag ${country} is missing from the export.`);
      return `<img src="${data}" alt="${country.toUpperCase()} flag">`;
    }).join('');
    const style = `--card-bg:${theme.background};--card-accent:${theme.accent};--card-text:${theme.text}`;
    return `<div class="pair" style="${style}"><article class="card front">${phrase}</article><article class="card back">${phrase}<div class="flags">${images}</div><h2>${escape(languageName(card.language))}</h2><p class="guide"><b>Česky:</b> ${escape(card.czechPronunciation)}</p><p class="ipa" dir="ltr"><b>IPA:</b> ${escape(card.ipa)}</p><small>${escape(card.variety)}</small></article></div>`;
  }).join('');
  return `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(deck.title)}</title><style>
*{box-sizing:border-box}body{margin:0;background:#eeeaf5;color:#20172d;font-family:Arial,"Segoe UI",sans-serif}.toolbar{max-width:1000px;margin:24px auto;padding:16px}h1{font-size:24px}button{padding:12px 20px;cursor:pointer}.pair{display:grid;grid-template-columns:1fr 1fr;gap:12px;max-width:1000px;margin:18px auto;break-inside:avoid}.card{position:relative;min-height:300px;padding:30px;border:0;border-radius:22px;background:var(--card-bg);color:var(--card-text);box-shadow:0 12px 32px #2f244522;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;overflow:hidden;overflow-wrap:anywhere}.card:before{content:"";position:absolute;inset:0 0 auto;height:8px;background:var(--card-accent)}.card:after{content:"";position:absolute;width:180px;height:180px;border:24px solid var(--card-accent);opacity:.08;border-radius:50%;right:-95px;bottom:-110px}.phrase{position:relative;z-index:1;font-size:clamp(34px,4.4vw,52px);font-weight:800;line-height:1.25;margin:0;width:100%;white-space:pre-wrap}.back .phrase{font-size:26px}.flags{position:relative;z-index:1;display:flex;justify-content:center;gap:8px;margin-top:16px}.flags img{width:40px;height:28px;object-fit:contain;filter:drop-shadow(0 2px 3px #0004)}h2{position:relative;z-index:1;font-size:20px;margin:12px 0 4px}.guide,.ipa,small{position:relative;z-index:1}.guide{font-size:18px;line-height:1.35;margin:8px 0}.ipa{font-family:"Segoe UI","DejaVu Sans",sans-serif;font-size:16px;line-height:1.4;margin:4px 0}small{font-size:11px;opacity:.78}@media(max-width:600px){.pair{grid-template-columns:1fr;margin:16px}.phrase{font-size:38px}}@page{size:A4;margin:10mm}@media print{body{background:white}.toolbar{display:none}.pair{grid-template-columns:90mm 90mm;gap:5mm;margin:0 0 5mm;break-inside:avoid}.card{border-radius:3mm;min-height:65mm;padding:6mm;box-shadow:none;-webkit-print-color-adjust:exact;print-color-adjust:exact}.phrase{font-size:26px}.back .phrase{font-size:18px}.guide{font-size:13px}.ipa{font-size:11px}.flags{margin-top:6px}.flags img{width:27px;height:18px}h2{font-size:14px;margin-top:6px}}
</style><header class="toolbar"><h1>${escape(deck.title)}</h1><p>Source phrase: ${escape(deck.sourcePhrase)}</p><p>Left: phrase-only front. Right: matching back. Print at 100% with browser headers and footers off; cut or fold each pair. Flags represent the selected varieties, not every place a language is spoken. Translations and IPA are unreviewed drafts.</p><button onclick="window.print()">Print / Save as PDF</button></header><main>${rows}</main></html>`;
}

export async function embedPhraseFlags(): Promise<Record<string, string>> {
  const codes = [...new Set(Object.values(phraseProfiles).flatMap(item => item.flags))];
  const entries = await Promise.all(codes.map(async country => {
    const response = await fetch(flagPath(country));
    if (!response.ok) throw new Error(`Could not load flag ${country}. Try again before exporting.`);
    const blob = await response.blob();
    const data = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = () => reject(new Error('Could not embed flag.')); reader.readAsDataURL(blob); });
    return [country, data] as const;
  }));
  return Object.fromEntries(entries);
}
