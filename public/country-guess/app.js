import { makeRounds } from './engine.js';
import { visibleAreas, pickConcealment, hidingForMode } from './clue-layout.js';

const $ = selector => document.querySelector(selector);
const titles = { border: 'Country Borders', flag: 'Country Flags', mixed: 'Half Flag, Half Border' };
const hidingTitles = { none: 'Full clues', horizontal: 'Horizontal half', vertical: 'Vertical half', diagonal: 'Diagonal half', strips: 'Alternating strips', windows: 'Checkerboard windows', random: 'Different hiding each country' };
let countries = [], mode = 'mixed', rounds = [], index = 0, score = 0, ready = false, answered = false;
let history = [], settings, renderVersion = 0;
const images = new Map();

function show(section) {
  for (const id of ['setup', 'game', 'results', 'about']) $(`#${id}`).hidden = id !== section;
  window.scrollTo({ top: 0, behavior: 'instant' });
}
function imageFor(path) {
  const url = new URL(path, document.baseURI).href;
  if (!images.has(url)) images.set(url, new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => { images.delete(url); reject(new Error('The clue image could not load.')); };
    image.src = url;
  }));
  return images.get(url);
}
function layer(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width; canvas.height = height;
  return canvas;
}
function contained(image, width, height, padding = 45) {
  const scale = Math.min((width - padding * 2) / image.width, (height - padding * 2) / image.height);
  return [(width - image.width * scale) / 2, (height - image.height * scale) / 2, image.width * scale, image.height * scale];
}
async function renderClue(canvas, country, clueMode, isCurrent = () => true, concealment = 'none', seed = 0) {
  concealment = hidingForMode(clueMode, concealment);
  const flag = clueMode !== 'border' ? await imageFor(country.flag) : null;
  const shape = clueMode !== 'flag' ? await imageFor(country.silhouette) : null;
  if (!isCurrent()) return;
  const { width, height } = canvas;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, width, height);
  if (clueMode === 'mixed') {
    const paneHeight = (height - 64) / 2;
    const flagPane = layer(width, paneHeight), borderPane = layer(width, paneHeight);
    drawFlag(flagPane, flag, concealment, seed);
    drawBorder(borderPane, shape, concealment, seed + 1, canvas.id.startsWith('preview'));
    ctx.drawImage(flagPane, 0, 24); ctx.drawImage(borderPane, 0, paneHeight + 56);
    ctx.strokeStyle = '#a18a6255'; ctx.setLineDash([4, 5]); ctx.beginPath();
    ctx.moveTo(55, height / 2); ctx.lineTo(width - 55, height / 2); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#8a7050'; ctx.font = '13px Georgia'; ctx.textAlign = 'center';
    ctx.fillText('F L A G', width / 2, 19); ctx.fillText('B O R D E R', width / 2, height / 2 + 21);
  } else if (clueMode === 'flag') drawFlag(canvas, flag, concealment, seed);
  else drawBorder(canvas, shape, concealment, seed, canvas.id.startsWith('preview'));
}
function clipAreas(ctx, rect, style, seed) {
  const [x, y, w, h] = rect;
  ctx.beginPath();
  for (const area of visibleAreas(style, seed)) {
    if (area.points) {
      ctx.moveTo(x + area.points[0][0] * w, y + area.points[0][1] * h);
      for (const point of area.points.slice(1)) ctx.lineTo(x + point[0] * w, y + point[1] * h);
      ctx.closePath();
    } else ctx.rect(x + area.x * w, y + area.y * h, area.w * w, area.h * h);
  }
  ctx.clip();
}
function drawFlag(canvas, image, concealment, seed) {
  const ctx = canvas.getContext('2d'), rect = contained(image, canvas.width, canvas.height, 28);
  ctx.save(); clipAreas(ctx, rect, concealment, seed); ctx.drawImage(image, ...rect);
  ctx.strokeStyle = '#6d513c'; ctx.lineWidth = 1.5; ctx.strokeRect(...rect); ctx.restore();
}
function drawBorder(canvas, shape, concealment, seed, preview) {
  const { width, height } = canvas, ctx = canvas.getContext('2d');
  const rect = contained(shape, width, height, 25);
  const mask = layer(width, height), maskCtx = mask.getContext('2d', { willReadFrequently: true });
  maskCtx.drawImage(shape, ...rect);
  const pixels = maskCtx.getImageData(0, 0, width, height), alpha = new Uint8Array(width * height);
  for (let i = 0; i < alpha.length; i++) alpha[i] = pixels.data[i * 4 + 3];
  const stroke = preview ? 4 : 3;
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    const i = y * width + x, p = i * 4;
    if (!alpha[i]) continue;
    const edge = x < stroke || y < stroke || x >= width - stroke || y >= height - stroke ||
      alpha[i - stroke] < 80 || alpha[i + stroke] < 80 || alpha[i - width * stroke] < 80 || alpha[i + width * stroke] < 80;
    pixels.data[p] = 82; pixels.data[p + 1] = 58; pixels.data[p + 2] = 37;
    pixels.data[p + 3] = edge ? alpha[i] : 0;
  }
  maskCtx.putImageData(pixels, 0, 0);
  ctx.save(); clipAreas(ctx, rect, concealment, seed); ctx.drawImage(mask, 0, 0); ctx.restore();
}
function getPool() {
  const region = $('#region').value;
  return countries.filter(c => region === 'all' || (region === 'Americas' ? c.continent.endsWith('America') : c.continent === region));
}
function updateRegion() {
  const region = $('#region').value;
  for (const button of document.querySelectorAll('[data-region]')) {
    if (button.dataset.region === region) button.setAttribute('aria-current', 'page');
    else button.removeAttribute('aria-current');
  }
  $('#collection-region').textContent = region === 'all' ? 'The World Collection' : `The ${region} Collection`;
  $('#country-count').textContent = `${getPool().length} lands to discover`;
  if (countries.length) previews();
}
async function previews() {
  const pool = getPool();
  const example = pool.find(c => c.iso2 === 'it') || pool.find(c => c.iso2 === 'jp') || pool[0];
  if (!example) return;
  const region = $('#region').value, hiding = $('#hiding').value;
  await Promise.allSettled(['border', 'flag', 'mixed'].map(clueMode => renderClue($(`#preview-${clueMode}`), example, clueMode,
    () => $('#region').value === region && $('#hiding').value === hiding, pickConcealment(hidingForMode(clueMode, hiding), 0), 0)));
}
function chooseMode(nextMode) {
  mode = nextMode;
  $('.hiding-setting').hidden = mode !== 'mixed';
  for (const button of document.querySelectorAll('[data-mode]')) {
    const selected = button.dataset.mode === mode;
    button.setAttribute('aria-pressed', String(selected));
    button.querySelector('.card-action').textContent = selected ? 'Selected ✓' : 'Choose this game →';
  }
  $('#selected-game').textContent = titles[mode];
}
function start() {
  if (!countries.length) return;
  settings = { mode, region: $('#region').value, count: $('#rounds').value, hiding: hidingForMode(mode, $('#hiding').value) };
  rounds = makeRounds(getPool(), { ...settings, region: 'all' });
  rounds.forEach(round => { round.seed = Math.floor(Math.random() * 10000); round.concealment = pickConcealment(settings.hiding, round.seed); });
  index = score = 0; history = [];
  show('game'); renderRound();
}
async function renderRound() {
  ready = answered = false;
  const version = ++renderVersion, round = rounds[index];
  $('#reveal').hidden = true;
  $('#next').hidden = true; $('#feedback').replaceChildren(); $('#clue-error').hidden = $('#retry').hidden = true;
  $('#clue').height = settings.mode === 'mixed' ? 640 : 520;
  $('#clue').classList.toggle('stacked', settings.mode === 'mixed');
  $('#clue').setAttribute('aria-busy', 'true');
  $('#game-mode').textContent = titles[settings.mode];
  $('#clue-description').textContent = `${settings.mode === 'mixed' ? 'Flag above · Border below · ' : ''}${hidingTitles[round.concealment]}`;
  $('#clue').setAttribute('aria-label', `${settings.mode === 'mixed' ? 'Flag clue above, border clue below' : titles[settings.mode]} — ${hidingTitles[round.concealment]}. Choose a country below.`);
  $('#round-label').textContent = `Country ${index + 1} of ${rounds.length}`;
  $('#score').textContent = `${score} correct`;
  $('#progress').style.width = `${index / rounds.length * 100}%`;
  $('#answers').replaceChildren(...round.choices.map((country, i) => {
    const button = document.createElement('button'); button.className = 'answer'; button.disabled = true;
    const key = document.createElement('span'); key.className = 'key'; key.textContent = String(i + 1); key.setAttribute('aria-hidden', 'true');
    const name = document.createElement('span'); name.textContent = country.name;
    button.append(key, name); button.dataset.iso2 = country.iso2; button.addEventListener('click', () => guess(country));
    return button;
  }));
  try {
    await renderClue($('#clue'), round.country, settings.mode, () => version === renderVersion, round.concealment, round.seed);
    if (version !== renderVersion) return;
    ready = true;
    for (const button of $('#answers').children) button.disabled = false;
  } catch {
    if (version !== renderVersion) return;
    $('#clue-error').textContent = 'This clue could not load. Please try again.';
    $('#clue-error').hidden = $('#retry').hidden = false;
  } finally {
    if (version === renderVersion) $('#clue').setAttribute('aria-busy', 'false');
  }
}
function guess(choice) {
  if (!ready || answered) return;
  answered = true;
  const country = rounds[index].country, correct = choice.iso2 === country.iso2;
  if (correct) score++;
  history.push({ country, choice, correct });
  for (const button of $('#answers').children) {
    button.disabled = true;
    button.classList.add(button.dataset.iso2 === country.iso2 ? 'correct' : button.dataset.iso2 === choice.iso2 ? 'wrong' : 'dim');
  }
  const title = document.createElement('strong'), detail = document.createElement('span');
  title.textContent = correct ? `Correct — ${country.name}.` : `The answer is ${country.name}.`;
  detail.textContent = `${country.continent} · Capital: ${country.capital}`;
  $('#feedback').replaceChildren(title, detail);
  $('#score').textContent = `${score} correct`;
  $('#progress').style.width = `${(index + 1) / rounds.length * 100}%`;
  $('#next').textContent = index + 1 === rounds.length ? 'See results →' : 'Next country →';
  $('#next').hidden = false;
  $('#reveal').hidden = rounds[index].concealment === 'none';
  $('#next').focus({ preventScroll: true });
}
function next() {
  if (!answered) return;
  if (++index < rounds.length) renderRound(); else results();
}
function results() {
  ready = false; show('results');
  $('#result-score').textContent = String(score); $('#result-total').textContent = ` / ${rounds.length}`;
  const ratio = score / rounds.length;
  $('#result-message').textContent = ratio === 1 ? 'A flawless journey. You know your way around the atlas.' : ratio >= .7 ? 'A fine expedition. There is always another corner to discover.' : 'Every journey teaches something. Review your stops and set out again.';
  const key = `geographer-atlas:best:v2:${settings.mode}:${settings.hiding}:${settings.region}:${rounds.length}`;
  try {
    const stored = Number(localStorage.getItem(key)), best = Math.max(score, Number.isFinite(stored) && stored >= 0 && stored <= rounds.length ? stored : 0);
    localStorage.setItem(key, String(best)); $('#best').textContent = `Best for this journey: ${best} / ${rounds.length}`;
  } catch { $('#best').textContent = 'Best scores are unavailable in this browser.'; }
  const heading = document.createElement('h2'); heading.className = 'review-heading'; heading.textContent = 'Your expedition journal';
  $('#review').replaceChildren(heading, ...history.map(({ country, choice, correct }) => {
    const row = document.createElement('div'); row.className = 'review-row';
    const flag = document.createElement('img'); flag.src = country.flag; flag.alt = ''; flag.loading = 'lazy';
    const text = document.createElement('div'); text.className = 'review-text';
    const name = document.createElement('strong'); name.textContent = country.name;
    const detail = document.createElement('small'); detail.textContent = correct ? country.capital : `You chose ${choice.name} · Capital: ${country.capital}`;
    text.append(name, detail);
    const status = document.createElement('span'); status.className = `review-status${correct ? '' : ' miss'}`; status.textContent = correct ? '✓ Correct' : '✗ Missed';
    row.append(flag, text, status); return row;
  }));
}
function home() { renderVersion++; ready = false; show('setup'); }
for (const button of document.querySelectorAll('[data-mode]')) button.addEventListener('click', () => chooseMode(button.dataset.mode));
for (const button of document.querySelectorAll('[data-region]')) button.addEventListener('click', () => {
  $('#region').value = button.dataset.region; updateRegion(); home();
});
$('#region').addEventListener('change', updateRegion);
$('#hiding').addEventListener('change', previews);
$('#reveal').addEventListener('click', async () => {
  if (!answered || !ready) return;
  const version = renderVersion, round = rounds[index];
  try {
    await renderClue($('#clue'), round.country, settings.mode, () => version === renderVersion, 'none', round.seed);
    if (version !== renderVersion) return;
    $('#reveal').hidden = true; $('#clue-description').textContent = 'Full clues revealed';
    $('#clue').setAttribute('aria-label', `Full clues for ${round.country.name}`);
  } catch { $('#clue-description').textContent = 'Could not reveal full clues. Try again.'; }
});
$('#start').addEventListener('click', start); $('#again').addEventListener('click', start);
$('#next').addEventListener('click', next); $('#retry').addEventListener('click', renderRound);
$('#quit').addEventListener('click', home); $('#change').addEventListener('click', home);
$('#about-link').addEventListener('click', event => { event.preventDefault(); renderVersion++; ready = false; show('about'); });
$('#about-back').addEventListener('click', home);
$('#reload').addEventListener('click', () => location.reload());
$('#fullscreen').addEventListener('click', async () => {
  try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen(); }
  catch { $('#fullscreen').title = 'Fullscreen is unavailable in this browser.'; }
});
document.addEventListener('keydown', event => {
  if ($('#game').hidden || event.altKey || event.ctrlKey || event.metaKey || /INPUT|SELECT|TEXTAREA/.test(event.target.tagName)) return;
  if (/^[1-4]$/.test(event.key) && ready && !answered) { event.preventDefault(); $('#answers').children[Number(event.key) - 1].click(); }
  else if (event.key === 'Enter' && answered && event.target.id !== 'next') { event.preventDefault(); next(); }
});
async function init() {
  try {
    const response = await fetch('../flag-card-studio/data/countries.json');
    if (!response.ok) throw new Error('Catalog unavailable');
    const data = await response.json();
    if (!Array.isArray(data.countries) || data.countries.length < 4) throw new Error('Catalog empty');
    countries = data.countries;
    for (const region of ['Africa', 'Americas', 'Asia', 'Oceania', 'Europe', 'North America', 'South America']) {
      const option = document.createElement('option'); option.value = option.textContent = region; $('#region').append(option);
    }
    updateRegion(); $('#start').disabled = false; $('#start').textContent = 'Begin expedition →';
  } catch { $('#load-error').hidden = false; $('#start').textContent = 'Countries unavailable'; }
}
init();
