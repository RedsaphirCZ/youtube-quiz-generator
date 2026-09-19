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
export interface PhraseCard { language: LanguageCode; phrase: string; ipa: string; variety: string }
export interface PhraseDeck {
  schema: 'phrase-flashcards/v1'; id: string; title: string; sourcePhrase: string; sourceLanguage: LanguageCode;
  context: string; cards: PhraseCard[]; createdAt: string; reviewed: false;
}
export interface PhraseConfig { title: string; phrase: string; sourceLanguage: LanguageCode; context: string }
const required = (value: unknown, label: string, limit = 500) => {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > limit) throw new Error(`${label} needs 1–${limit} characters.`);
  return value.trim();
};
const isObject = (value: unknown): value is Record<string, unknown> => !!value && typeof value === 'object' && !Array.isArray(value);
const code = (value: unknown): LanguageCode => {
  if (!languages.some(item => item[0] === value)) throw new Error(`Unsupported language code: ${String(value)}.`);
  return value as LanguageCode;
};

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
- Check every translation and IPA against reliable dictionaries or pronunciation references. Never invent a pronunciation. If uncertain, resolve it before returning the complete deck.
- Each back displays the same phrase, language name, representative country flags and IPA. The app supplies flags from its bundled assets; do not supply image links or emoji flags.
- The deck is an unreviewed draft for a human language check. IPA shape validation cannot establish phonetic accuracy.
- No extra languages, duplicate cards or missing cards. Escape JSON correctly. Keep sourcePhrase exactly as provided.

Return ONLY valid JSON using this structure, replacing the example card with ALL ${languages.length} cards:
${JSON.stringify({ schema: 'phrase-flashcards/v1', title, sourcePhrase: phrase, sourceLanguage: config.sourceLanguage, context: config.context.trim() || 'Describe the intended everyday meaning and register', cards: [{ language: 'en', phrase: 'Natural English translation', ipa: '/complete IPA transcription/', variety: phraseProfiles.en.variety }] }, null, 2)}
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
    return { language, phrase: required(item.phrase, `${languageName(language)} phrase`, 240), ipa, variety: required(item.variety, `${languageName(language)} variety`, 160) };
  });
  cards.sort((a, b) => languages.findIndex(item => item[0] === a.language) - languages.findIndex(item => item[0] === b.language));
  return { schema: 'phrase-flashcards/v1', id: preserveIdentity ? required(parsed.id, 'ID') : `phrase-${crypto.randomUUID()}`,
    title: required(parsed.title, 'Deck name', 120), sourcePhrase: required(parsed.sourcePhrase, 'Source phrase', 240), sourceLanguage: code(parsed.sourceLanguage),
    context: typeof parsed.context === 'string' ? parsed.context.trim() : '', cards,
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
    const phrase = `<p class="phrase" lang="${card.language}" dir="${languageDirection(card.language)}">${escape(card.phrase)}</p>`;
    const images = phraseProfiles[card.language].flags.map(country => {
      const data = flags[country];
      if (!data || !/^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(data)) throw new Error(`Flag ${country} is missing from the export.`);
      return `<img src="${data}" alt="${country.toUpperCase()} flag">`;
    }).join('');
    return `<div class="pair"><article class="card front">${phrase}</article><article class="card back">${phrase}<div class="flags">${images}</div><h2>${escape(languageName(card.language))}</h2><p class="ipa" dir="ltr">${escape(card.ipa)}</p><small>${escape(card.variety)}</small></article></div>`;
  }).join('');
  return `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(deck.title)}</title><style>
*{box-sizing:border-box}body{margin:0;background:#f3f0f8;color:#20172d;font-family:Arial,"Segoe UI",sans-serif}.toolbar{max-width:1000px;margin:24px auto;padding:16px}h1{font-size:24px}button{padding:12px 20px;cursor:pointer}.pair{display:grid;grid-template-columns:1fr 1fr;gap:12px;max-width:1000px;margin:16px auto;break-inside:avoid}.card{min-height:280px;padding:24px;border:1px solid #b8a5ce;border-radius:16px;background:white;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;overflow-wrap:anywhere}.phrase{font-size:clamp(18px,2.4vw,28px);line-height:1.5;margin:0;width:100%;white-space:pre-wrap}.back .phrase{font-size:22px}.flags{display:flex;justify-content:center;gap:8px;margin-top:16px}.flags img{width:40px;height:28px;object-fit:contain}h2{font-size:18px;margin:12px 0 4px}.ipa{font-family:"Segoe UI","DejaVu Sans",sans-serif;font-size:20px;line-height:1.5;margin:8px 0}small{font-size:11px;color:#625370}@media(max-width:600px){.pair{grid-template-columns:1fr;margin:16px}.phrase{font-size:24px}}@page{size:A4;margin:10mm}@media print{body{background:white}.toolbar{display:none}.pair{grid-template-columns:90mm 90mm;gap:5mm;margin:0 0 5mm;break-inside:avoid}.card{border-radius:0;min-height:65mm;padding:5mm}.phrase,.back .phrase{font-size:18px}.ipa{font-size:16px}.flags{margin-top:8px}.flags img{width:30px;height:20px}h2{font-size:14px;margin-top:8px}}
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
