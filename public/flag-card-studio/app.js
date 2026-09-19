"use strict";

const BLEED_MM = 3;
const SAFE_MARGIN_MM = 5;
const DPI = 300;
const PX_PER_MM = DPI / 25.4;
const CARD_FORMATS = {
  poker: { id: "poker", label: "Poker", optionLabel: "Poker — 63.5 × 88.9 mm", trimW: 63.5, trimH: 88.9, kind: "card", bleedMm: BLEED_MM, safeMarginMm: SAFE_MARGIN_MM },
  tarot: { id: "tarot", label: "Tarot", optionLabel: "Tarot — 70 × 120 mm", trimW: 70, trimH: 120, kind: "card", bleedMm: BLEED_MM, safeMarginMm: SAFE_MARGIN_MM }
};
const WORKSHEET_FORMATS = {
  a4: { id: "a4", label: "A4", optionLabel: "A4 — 210 × 297 mm", trimW: 210, trimH: 297, kind: "worksheet", bleedMm: 0, safeMarginMm: 12, defaultItemsPerPage: 12, itemsPerPageOptions: [4, 6, 8, 9, 12] },
  a5: { id: "a5", label: "A5", optionLabel: "A5 — 148 × 210 mm", trimW: 148, trimH: 210, kind: "worksheet", bleedMm: 0, safeMarginMm: 10, defaultItemsPerPage: 6, itemsPerPageOptions: [2, 4, 6] }
};
const CONTINENTS = ["Any continent", "Africa", "Asia", "Europe", "North America", "South America", "Oceania"];
const FRONT_MODES = ["flags", "silhouettes", "capitals"];
const NATO_ISO = new Set(["al","be","bg","ca","hr","cz","dk","ee","fi","fr","de","gr","hu","is","it","lv","lt","lu","me","nl","mk","no","pl","pt","ro","sk","si","es","se","tr","gb","us"]);
const EU_ISO = new Set(["at","be","bg","hr","cy","cz","dk","ee","fi","fr","de","gr","hu","ie","it","lv","lt","lu","mt","nl","pl","pt","ro","sk","si","es","se"]);
const COUNTRY_GROUPS = { nato: NATO_ISO, eu: EU_ISO };
const EASY_ISO = new Set([
  "ar","au","at","be","br","ca","cl","cn","co","hr","cu","cz","dk","eg","fi","fr","de","gr","is","in","id","ie","il","it","jp","mx","ma","nl","nz","no","pl","pt","ru","za","kr","es","se","ch","tr","ua","gb","us","va","vn"
]);
const SHAPE_COLORS = [
  "#D83A34", // red
  "#2F6FD2", // blue
  "#F2C230", // yellow
  "#2E9B54", // green
  "#E97B24", // orange
  "#7A4CC2", // purple
  "#E35D9A", // pink
  "#24AFC1", // cyan
  "#77B82A", // lime
  "#8B5A3C"  // brown
];
const state = {
  countries: [],
  lookup: new Map(),
  cards: [],
  title: "Your deck",
  criteria: "",
  itemsPerCard: 4,
  outputMode: "cards",
  cardFormat: "poker",
  worksheetSize: "a4",
  worksheetItemsPerPage: 12,
  frontMode: "flags",
  orientation: "landscape",
  cardOrientation: "landscape",
  worksheetOrientation: "portrait",
  backgroundColor: "#e6e8e5",
  deckId: "",
  imageCache: new Map(),
  silhouetteRenderCache: new Map()
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

document.addEventListener("DOMContentLoaded", init);

async function init() {
  wireNavigation();
  wireForms();
  populateContinents();
  updateRandomModeFields();
  try {
    const response = await fetch("data/countries.json");
    if (!response.ok) throw new Error(`Country data returned ${response.status}`);
    const payload = await response.json();
    state.countries = (payload.countries || payload).map((country) => ({
      ...country,
      silhouette: country.silhouette || `assets/silhouettes/${country.iso2}.png`
    }));
    buildLookup();
    updateRandomAvailability();
  } catch (error) {
    $("#randomStatus").textContent = "Country data could not be loaded. Start the app with run-card-studio.bat.";
    showToast(error.message);
  }
  populatePrintSizes();
  updateDeckUI();
  window.__flagCardStudio = { state, CARD_FORMATS, WORKSHEET_FORMATS, importDeck, generateRandomDeck, renderCardCanvas, buildPdf, getGeometry, getWorksheetPages };
}

function wireNavigation() {
  $("#homeButton").addEventListener("click", () => showView("homeView"));
  $("#deckButton").addEventListener("click", () => showView("deckView"));
  $$('[data-open]').forEach((button) => button.addEventListener("click", () => showView(button.dataset.open)));
}

function showView(id) {
  $$(".view").forEach((view) => { view.hidden = view.id !== id; });
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (id === "deckView" && state.cards.length) void nextFrame().then(renderPreviewSilhouettes);
}

function wireForms() {
  $("#promptForm").addEventListener("submit", (event) => {
    event.preventDefault();
    generatePrompt();
  });
  $("#copyPromptButton").addEventListener("click", copyPrompt);
  $("#promptAllMatches").addEventListener("change", updatePromptLimitField);
  $("#importButton").addEventListener("click", () => importDeck($("#jsonInput").value));
  $("#loadExampleButton").addEventListener("click", loadExample);
  $("#randomForm").addEventListener("submit", (event) => {
    event.preventDefault();
    generateRandomDeck();
  });
  $("#randomOutputMode").addEventListener("change", updateRandomModeFields);
  $("#randomWorksheetSize").addEventListener("change", () => { populateRandomWorksheetItems(); updateRandomAvailability(); });
  $("#randomAllContinents").addEventListener("change", (event) => {
    $$(".random-continent").forEach((checkbox) => { if (event.target.checked) checkbox.checked = false; });
    updateRandomAvailability();
  });
  $$(".random-continent").forEach((checkbox) => checkbox.addEventListener("change", () => {
    $("#randomAllContinents").checked = !$$('.random-continent:checked').length;
    updateRandomAvailability();
  }));
  $("#randomRecognized").addEventListener("change", (event) => {
    $$(".random-group").forEach((checkbox) => { if (event.target.checked) checkbox.checked = false; });
    if (!event.target.checked && !$$('.random-group:checked').length) event.target.checked = true;
    updateRandomAvailability();
  });
  $$(".random-group").forEach((checkbox) => checkbox.addEventListener("change", () => {
    $("#randomRecognized").checked = !$$('.random-group:checked').length;
    updateRandomAvailability();
  }));
  ["randomDifficulty", "randomFlagsPerCard", "randomWorksheetItems", "randomCardCount", "randomWorksheetCount", "allowRepeats"].forEach((id) => {
    $("#" + id).addEventListener("change", updateRandomAvailability);
  });
  $("#useAllCountries").addEventListener("change", () => { updateRepeatFields(); updateRandomAvailability(); });
  $("#outputMode").addEventListener("change", (event) => {
    if (state.outputMode === "worksheet") state.worksheetOrientation = state.orientation;
    else state.cardOrientation = state.orientation;
    state.outputMode = event.target.value;
    if (state.outputMode === "cards") repackCurrentSelection(state.itemsPerCard);
    state.orientation = state.outputMode === "worksheet" ? state.worksheetOrientation : state.cardOrientation;
    $("#cardOrientation").value = state.orientation;
    populatePrintSizes();
    renderDeck();
  });
  $("#outputItemsPerCard").addEventListener("change", (event) => {
    state.itemsPerCard = clampInt(event.target.value, 2, 6);
    repackCurrentSelection(state.itemsPerCard);
    renderDeck();
  });
  $("#worksheetItemsPerPage").addEventListener("change", (event) => {
    state.worksheetItemsPerPage = Number(event.target.value);
    renderDeck();
  });
  $("#printSize").addEventListener("change", (event) => {
    if (state.outputMode === "worksheet") {
      state.worksheetSize = event.target.value;
      const format = WORKSHEET_FORMATS[state.worksheetSize];
      if (!format.itemsPerPageOptions.includes(state.worksheetItemsPerPage)) state.worksheetItemsPerPage = format.defaultItemsPerPage;
      populateWorksheetItems();
    } else state.cardFormat = event.target.value;
    renderDeck();
  });
  $("#frontMode").addEventListener("change", (event) => { state.frontMode = event.target.value; renderDeck(); });
  $("#cardOrientation").addEventListener("change", (event) => {
    state.orientation = event.target.value;
    if (state.outputMode === "worksheet") state.worksheetOrientation = state.orientation;
    else state.cardOrientation = state.orientation;
    renderDeck();
  });
  $("#backgroundColor").addEventListener("input", (event) => { state.backgroundColor = event.target.value; renderDeck(); });
  $("#randomColorButton").addEventListener("click", () => {
    state.backgroundColor = randomMutedColor();
    $("#backgroundColor").value = state.backgroundColor;
    renderDeck();
    showToast(`Muted background: ${state.backgroundColor}`);
  });
  $("#shuffleButton").addEventListener("click", () => { state.cards = shuffle([...state.cards]); renderDeck(); showToast("Deck shuffled"); });
  $("#downloadJsonButton").addEventListener("click", downloadDeckJson);
  $("#exportPdfButton").addEventListener("click", exportPdf);
}

function updateRandomModeFields() {
  const worksheet = $("#randomOutputMode").value === "worksheet";
  $$('[data-random-mode="cards"]').forEach((field) => { field.hidden = worksheet; });
  $$('[data-random-mode="worksheet"]').forEach((field) => { field.hidden = !worksheet; });
  $("#allowRepeatsLabel").textContent = worksheet ? "Allow countries to repeat across worksheets" : "Allow countries to repeat between cards";
  $("#randomSubmitButton").textContent = worksheet ? "Generate worksheets" : "Generate cards";
  populateRandomWorksheetItems();
  updateRepeatFields();
  updateRandomAvailability();
}

function updateRepeatFields() {
  const useAll = $("#useAllCountries").checked;
  const worksheet = $("#randomOutputMode").value === "worksheet";
  $("#allowRepeats").disabled = useAll;
  if (useAll) $("#allowRepeats").checked = false;
  $("#randomCardCount").disabled = useAll && !worksheet;
  $("#randomWorksheetCount").disabled = useAll && worksheet;
}

function populateRandomWorksheetItems() {
  const format = WORKSHEET_FORMATS[$("#randomWorksheetSize").value] || WORKSHEET_FORMATS.a4;
  const current = Number($("#randomWorksheetItems").value);
  const selected = format.itemsPerPageOptions.includes(current) ? current : format.defaultItemsPerPage;
  $("#randomWorksheetItems").innerHTML = format.itemsPerPageOptions.map((count) => `<option value="${count}"${count === selected ? " selected" : ""}>${count}</option>`).join("");
}

function updatePromptLimitField() {
  $("#promptLimitField").hidden = $("#promptAllMatches").checked;
}

function populateContinents() {
  $$(".continent-select").forEach((select) => {
    select.innerHTML = CONTINENTS.map((name) => `<option value="${name === "Any continent" ? "any" : escapeHtml(name)}">${name}</option>`).join("");
  });
}

function populatePrintSizes() {
  const formats = state.outputMode === "worksheet" ? WORKSHEET_FORMATS : CARD_FORMATS;
  const selected = state.outputMode === "worksheet" ? state.worksheetSize : state.cardFormat;
  $("#printSize").innerHTML = Object.values(formats).map((format) => `<option value="${format.id}"${format.id === selected ? " selected" : ""}>${format.optionLabel}</option>`).join("");
  $("#outputMode").value = state.outputMode;
  $("#outputItemsPerCard").value = String(state.itemsPerCard);
  $$('[data-output-mode="cards"]').forEach((field) => { field.hidden = state.outputMode !== "cards"; });
  $$('[data-output-mode="worksheet"]').forEach((field) => { field.hidden = state.outputMode !== "worksheet"; });
  populateWorksheetItems();
}

function populateWorksheetItems() {
  const format = WORKSHEET_FORMATS[state.worksheetSize] || WORKSHEET_FORMATS.a4;
  if (!format.itemsPerPageOptions.includes(state.worksheetItemsPerPage)) state.worksheetItemsPerPage = format.defaultItemsPerPage;
  $("#worksheetItemsPerPage").innerHTML = format.itemsPerPageOptions.map((count) => `<option value="${count}"${count === state.worksheetItemsPerPage ? " selected" : ""}>${count}</option>`).join("");
}

function normalizeKey(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function buildLookup() {
  state.lookup.clear();
  state.countries.forEach((country) => {
    [country.name, country.iso2, country.iso3, ...(country.aliases || [])].forEach((value) => {
      const key = normalizeKey(value);
      if (key && !state.lookup.has(key)) state.lookup.set(key, country);
    });
  });
}

function getDifficulty(country) {
  if (EASY_ISO.has(country.iso2)) return "easy";
  const smallPopulation = Number(country.population || 0) < 2500000;
  const islandRegion = ["Caribbean", "Melanesia", "Micronesia", "Polynesia"].includes(country.subregion);
  if (smallPopulation || islandRegion) return "hard";
  return "medium";
}

function getPool(difficulty, continent, groups = ["recognized"]) {
  const selected = Array.isArray(continent) ? continent : continent === "any" || !continent ? [] : [continent];
  const selectedGroups = Array.isArray(groups) ? groups : [groups];
  return state.countries.filter((country) => {
    const continentMatch = !selected.length || selected.includes(country.continent);
    const difficultyMatch = difficulty === "mixed" || getDifficulty(country) === difficulty;
    const groupMatch = !selectedGroups.length || selectedGroups.includes("recognized") || selectedGroups.some((group) => COUNTRY_GROUPS[group]?.has(country.iso2));
    return continentMatch && difficultyMatch && groupMatch;
  });
}

function getSelectedContinents() { return $$(".random-continent:checked").map((checkbox) => checkbox.value); }
function getSelectedGroups() {
  const groups = $$(".random-group:checked").map((checkbox) => checkbox.value);
  return groups.length ? groups : ["recognized"];
}

function updateRandomAvailability() {
  if (!$("#randomStatus")) return;
  if (!state.countries.length) {
    $("#randomStatus").textContent = "Loading the built-in country library…";
    return;
  }
  const worksheet = $("#randomOutputMode").value === "worksheet";
  const difficulty = $("#randomDifficulty").value;
  const pool = getPool(difficulty, getSelectedContinents(), getSelectedGroups());
  const format = WORKSHEET_FORMATS[$("#randomWorksheetSize").value] || WORKSHEET_FORMATS.a4;
  const selectedWorksheetItems = Number($("#randomWorksheetItems").value);
  const itemsPerActivity = worksheet
    ? (format.itemsPerPageOptions.includes(selectedWorksheetItems) ? selectedWorksheetItems : format.defaultItemsPerPage)
    : Number($("#randomFlagsPerCard").value);
  const allCountryActivities = Math.max(1, Math.ceil(pool.length / Math.max(1, itemsPerActivity)));
  const maximumFullActivities = Math.max(1, Math.floor(pool.length / Math.max(1, itemsPerActivity)));
  const countInput = worksheet ? $("#randomWorksheetCount") : $("#randomCardCount");
  countInput.max = $("#allowRepeats").checked ? (worksheet ? "100" : "200") : String(maximumFullActivities);
  const useAll = $("#useAllCountries").checked;
  const activityLabel = worksheet ? "worksheet" : "card";
  $("#randomStatus").textContent = useAll
    ? `${pool.length} countries match. All will be used once across ${allCountryActivities} ${activityLabel}${allCountryActivities === 1 ? "" : "s"}.`
    : `${pool.length} countries match — maximum ${pool.length} unique clues. Repeats are off by default.`;
}

function generatePrompt() {
  if (!state.countries.length) return showToast("Country data is still loading");
  const criterion = $("#promptCriterion").value.trim();
  const continent = $("#promptContinent").value;
  const allMatches = $("#promptAllMatches").checked;
  const countryLimit = clampInt($("#promptCountryLimit").value, 2, 195);
  const extra = $("#promptExtra").value.trim();
  if (!criterion) {
    $("#promptStatus").textContent = "Describe the flag feature you want to find.";
    $("#promptCriterion").focus();
    return;
  }
  const pool = getPool("mixed", continent);
  const names = pool.map((country) => country.name).sort((a, b) => a.localeCompare(b));
  const continentDirection = continent === "any" ? "Countries may come from any continent." : `Use only countries in ${continent}.`;
  const amountDirection = allMatches
    ? "Return every country from the allowed list that confidently matches. Do not omit matches to reach a convenient layout size."
    : `Return up to ${countryLimit} confident matches. If more qualify, choose the clearest examples; if fewer qualify, return fewer.`;
  const extraDirection = extra ? `\n- Additional rule: ${extra}` : "";
  const prompt = `Research national flags and return a matching country set as strict JSON.\n\nSelection criterion:\n${criterion}\n\nRequirements:\n- ${amountDirection}\n- ${continentDirection}\n- Verify the current official national flag of every included country. Include only confident matches; never pad the list with weak or incorrect matches.\n- Interpret visible colours literally unless the criterion or additional rule says otherwise. Colours inside a visible emblem or coat of arms count. Ignore only minor shade variations of the same colour.\n- Use only country names from the allowed list below.\n- Do not group countries into cards or pages. The app will handle cards and A4/A5 worksheet layout after import.${extraDirection}\n\nReturn only valid JSON, with no markdown or commentary, using this exact shape:\n{\n  "title": "Short descriptive title",\n  "criteria": "Clear normalized description of the rule used",\n  "countries": ["Country name", "Country name"]\n}\n\nRules:\n- The countries array must be flat and contain unique names.\n- Spell every country exactly as shown in the allowed list.\n- Do not include image URLs, card groups, page groups, trivia, or extra fields.\n\nAllowed countries (${names.length}):\n${names.join(", ")}`;
  $("#promptOutput").value = prompt;
  $("#promptStatus").textContent = `Prompt ready with ${names.length} allowed countries.`;
}

async function copyPrompt() {
  const value = $("#promptOutput").value;
  if (!value) return showToast("Generate a prompt first");
  try {
    await navigator.clipboard.writeText(value);
    showToast("Prompt copied");
  } catch {
    $("#promptOutput").select();
    document.execCommand("copy");
    showToast("Prompt copied");
  }
}

function loadExample() {
  $("#jsonInput").value = JSON.stringify({
    title: "Flags using two visible colours",
    criteria: "National flags using exactly two visible colours",
    countries: ["Ukraine", "Poland", "Indonesia", "Monaco", "Austria", "Bangladesh", "Vietnam", "Palau"]
  }, null, 2);
}

function extractJson(raw) {
  let text = String(raw || "").trim();
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) text = fenced[1].trim();
  try { return JSON.parse(text); } catch (firstError) {
    const objectStart = text.indexOf("{");
    const arrayStart = text.indexOf("[");
    const start = objectStart < 0 ? arrayStart : arrayStart < 0 ? objectStart : Math.min(objectStart, arrayStart);
    const end = Math.max(text.lastIndexOf("}"), text.lastIndexOf("]"));
    if (start >= 0 && end > start) return JSON.parse(text.slice(start, end + 1));
    throw firstError;
  }
}

function resolveCountry(entry) {
  const value = typeof entry === "string" ? entry : entry?.name || entry?.iso2 || entry?.iso3 || entry?.country;
  return state.lookup.get(normalizeKey(value));
}

function getPlacements() {
  return state.cards.flatMap((card) => card.countries.map((country, index) => ({ country, shapeColor: card.shapeColors?.[index], frontMode: card.frontModes?.[index] || (FRONT_MODES.includes(state.frontMode) ? state.frontMode : "flags") })));
}

function packPlacementsIntoCards(placements, preferredSize = state.itemsPerCard) {
  const cards = [];
  let cursor = 0;
  const size = clampInt(preferredSize, 2, 6);
  while (cursor < placements.length) {
    const remaining = placements.length - cursor;
    let groupSize = Math.min(size, remaining);
    if (remaining === 3 && size === 2) groupSize = 3;
    if (remaining - groupSize === 1 && groupSize > 2) groupSize -= 1;
    const group = placements.slice(cursor, cursor + groupSize);
    const countries = group.map((placement) => placement.country);
    const suppliedColors = group.map((placement) => placement.shapeColor);
    const frontModes = group.map((placement) => FRONT_MODES.includes(placement.frontMode) ? placement.frontMode : "flags");
    cards.push({
      difficulty: inferCardDifficulty(countries),
      countries,
      shapeColors: normalizeShapeColors(suppliedColors, countries.length), frontModes
    });
    cursor += groupSize;
  }
  return cards;
}

function repackCurrentSelection(preferredSize) {
  const placements = getPlacements();
  if (placements.length >= 2) state.cards = packPlacementsIntoCards(placements, preferredSize);
}

function importDeck(raw) {
  if (!state.countries.length) return showToast("Country data is still loading");
  const report = $("#importReport");
  try {
    const payload = typeof raw === "string" ? extractJson(raw) : raw;
    const isFlatCountryEntry = (entry) => typeof entry === "string" || (entry && !Array.isArray(entry) && !Array.isArray(entry.countries) && !Array.isArray(entry.flags));
    const flatEntries = Array.isArray(payload)
      ? (payload.every(isFlatCountryEntry) ? payload : null)
      : (Array.isArray(payload?.countries) ? payload.countries : Array.isArray(payload?.flags) ? payload.flags : null);
    const inputCards = flatEntries ? null : Array.isArray(payload) ? payload : payload.cards;
    const importedFormat = Array.isArray(payload) ? {} : payload?.format || {};
    const importedFrontMode = importedFormat.frontMode;
    const legacyWorksheetSize = importedFormat.cardFormat === "a4-write-under" ? "a4" : importedFormat.cardFormat === "a5-write-under" ? "a5" : null;
    const importedOutputMode = legacyWorksheetSize ? "worksheet" : importedFormat.outputMode;
    const importedCardFormat = legacyWorksheetSize ? null : importedFormat.cardFormat;
    const importedWorksheetSize = legacyWorksheetSize || importedFormat.worksheetSize;
    if (importedFrontMode != null && ![...FRONT_MODES, "mixed"].includes(importedFrontMode)) {
      throw new Error('format.frontMode must be "flags", "silhouettes", "capitals", or "mixed".');
    }
    if (importedOutputMode != null && !["cards", "worksheet"].includes(importedOutputMode)) {
      throw new Error('format.outputMode must be either "cards" or "worksheet".');
    }
    if (importedCardFormat != null && !Object.hasOwn(CARD_FORMATS, importedCardFormat)) {
      throw new Error(`format.cardFormat must be one of: ${Object.keys(CARD_FORMATS).join(", ")}.`);
    }
    if (importedWorksheetSize != null && !Object.hasOwn(WORKSHEET_FORMATS, importedWorksheetSize)) {
      throw new Error(`format.worksheetSize must be one of: ${Object.keys(WORKSHEET_FORMATS).join(", ")}.`);
    }
    if (importedFormat.orientation != null && !["portrait", "landscape"].includes(importedFormat.orientation)) {
      throw new Error('format.orientation must be either "portrait" or "landscape".');
    }
    if (importedFormat.backgroundColor != null && !/^#[0-9a-f]{6}$/i.test(importedFormat.backgroundColor)) {
      throw new Error('format.backgroundColor must be a six-digit hex colour such as "#e6e8e5".');
    }
    if (importedFormat.itemsPerCard != null && (!Number.isInteger(Number(importedFormat.itemsPerCard)) || Number(importedFormat.itemsPerCard) < 2 || Number(importedFormat.itemsPerCard) > 6)) {
      throw new Error("format.itemsPerCard must be a whole number from 2 to 6.");
    }
    if (importedFormat.worksheetItemsPerPage != null) {
      const capacity = Number(importedFormat.worksheetItemsPerPage);
      const format = WORKSHEET_FORMATS[importedWorksheetSize || state.worksheetSize] || WORKSHEET_FORMATS.a4;
      if (!Number.isInteger(capacity) || !format.itemsPerPageOptions.includes(capacity)) {
        throw new Error(`format.worksheetItemsPerPage must be one of: ${format.itemsPerPageOptions.join(", ")} for ${format.label}.`);
      }
    }
    const importedItemsPerCard = importedFormat.itemsPerCard == null ? state.itemsPerCard : Number(importedFormat.itemsPerCard);
    const errors = [];
    let cards;
    let importedCountryCount = 0;
    if (flatEntries) {
      if (flatEntries.length < 2) throw new Error("The country set needs at least 2 countries.");
      if (flatEntries.length > 195) throw new Error("A country set may contain at most 195 countries.");
      const countries = flatEntries.map((entry, entryIndex) => {
        const country = resolveCountry(entry);
        if (!country) errors.push(`Country ${entryIndex + 1} is not recognized (${typeof entry === "string" ? entry : JSON.stringify(entry)}).`);
        return country;
      }).filter(Boolean);
      if (new Set(countries.map((country) => country.iso2)).size !== countries.length) errors.push("The country set contains a repeated country.");
      importedCountryCount = countries.length;
      const suppliedModes = Array.isArray(importedFormat.frontModes) ? importedFormat.frontModes : [];
      if (suppliedModes.some((mode) => !FRONT_MODES.includes(mode))) errors.push("format.frontModes contains an unsupported content type.");
      cards = packPlacementsIntoCards(countries.map((country, index) => ({ country, frontMode: suppliedModes[index] || (FRONT_MODES.includes(importedFrontMode) ? importedFrontMode : "flags") })), importedItemsPerCard);
    } else {
      if (!Array.isArray(inputCards) || !inputCards.length) throw new Error("The JSON needs a non-empty countries list (or a legacy cards array).");
      if (inputCards.length > 200) throw new Error("A deck may contain at most 200 cards.");
      cards = inputCards.map((item, cardIndex) => {
        const entries = Array.isArray(item) ? item : item.countries || item.flags;
        if (!Array.isArray(entries)) {
          errors.push(`Card ${cardIndex + 1}: missing countries or flags array.`);
          return null;
        }
        if (entries.length < 2 || entries.length > 6) errors.push(`Card ${cardIndex + 1}: needs 2-6 countries, found ${entries.length}.`);
        const countries = entries.map((entry, entryIndex) => {
          const country = resolveCountry(entry);
          if (!country) errors.push(`Card ${cardIndex + 1}, flag ${entryIndex + 1}: country not recognized (${typeof entry === "string" ? entry : JSON.stringify(entry)}).`);
          return country;
        }).filter(Boolean);
        if (new Set(countries.map((country) => country.iso2)).size !== countries.length) errors.push(`Card ${cardIndex + 1}: contains a repeated country.`);
        const suppliedDifficulty = Array.isArray(item) ? "mixed" : String(item.difficulty || "mixed").toLowerCase();
        const difficulty = ["easy", "medium", "hard", "mixed"].includes(suppliedDifficulty) ? suppliedDifficulty : "mixed";
        const suppliedColors = Array.isArray(item) ? null : item.shapeColors;
        const suppliedModes = Array.isArray(item) ? null : item.frontModes;
        if (suppliedModes != null && (!Array.isArray(suppliedModes) || suppliedModes.length !== countries.length || suppliedModes.some((mode) => !FRONT_MODES.includes(mode)))) errors.push(`Card ${cardIndex + 1}: frontModes must match the countries and use flags, silhouettes, or capitals.`);
        return { difficulty, countries, shapeColors: normalizeShapeColors(suppliedColors, countries.length), frontModes: Array.isArray(suppliedModes) ? suppliedModes : countries.map(() => FRONT_MODES.includes(importedFrontMode) ? importedFrontMode : "flags") };
      }).filter(Boolean);
      importedCountryCount = cards.reduce((sum, card) => sum + card.countries.length, 0);
    }
    if (errors.length) throw new Error(errors.slice(0, 8).join("\n") + (errors.length > 8 ? `\n…and ${errors.length - 8} more.` : ""));
    state.cards = cards;
    state.title = String(payload?.title || "Imported flag set").slice(0, 80);
    state.criteria = String(payload?.criteria || payload?.criterion || payload?.theme || "").slice(0, 240);
    state.itemsPerCard = importedItemsPerCard;
    state.frontMode = importedFrontMode || "flags";
    state.outputMode = importedOutputMode || "cards";
    state.cardFormat = importedCardFormat || state.cardFormat;
    state.worksheetSize = importedWorksheetSize || state.worksheetSize;
    state.worksheetItemsPerPage = importedFormat.worksheetItemsPerPage == null
      ? (WORKSHEET_FORMATS[state.worksheetSize] || WORKSHEET_FORMATS.a4).defaultItemsPerPage
      : Number(importedFormat.worksheetItemsPerPage);
    state.orientation = importedFormat.orientation || (state.outputMode === "worksheet" ? state.worksheetOrientation : state.cardOrientation);
    if (state.outputMode === "worksheet") state.worksheetOrientation = state.orientation;
    else state.cardOrientation = state.orientation;
    state.backgroundColor = importedFormat.backgroundColor || state.backgroundColor;
    $("#frontMode").value = state.frontMode;
    populatePrintSizes();
    $("#cardOrientation").value = state.orientation;
    $("#backgroundColor").value = state.backgroundColor;
    state.deckId = createDeckId();
    report.className = "report success";
    report.textContent = `${importedCountryCount} countries imported. Choose cards or worksheets, then adjust the layout.`;
    updateDeckUI();
    showView("deckView");
    showToast(`${importedCountryCount} countries imported`);
    return cards;
  } catch (error) {
    report.className = "report error";
    report.textContent = error.message;
    return null;
  }
}

function generateRandomDeck(options = null) {
  if (!state.countries.length) return showToast("Country data is still loading");
  const outputMode = options?.outputMode ?? $("#randomOutputMode").value;
  const worksheet = outputMode === "worksheet";
  const worksheetSize = options?.worksheetSize ?? $("#randomWorksheetSize").value;
  const worksheetFormat = WORKSHEET_FORMATS[worksheetSize] || WORKSHEET_FORMATS.a4;
  const requestedWorksheetItems = clampInt(options?.worksheetItemsPerPage ?? $("#randomWorksheetItems").value, 2, 12);
  const worksheetItemsPerPage = worksheetFormat.itemsPerPageOptions.includes(requestedWorksheetItems)
    ? requestedWorksheetItems
    : worksheetFormat.defaultItemsPerPage;
  const worksheetCount = clampInt(options?.worksheetCount ?? $("#randomWorksheetCount").value, 1, 100);
  const cardCount = clampInt(options?.cardCount ?? $("#randomCardCount").value, 1, 200);
  const flagsPerCard = clampInt(options?.flagsPerCard ?? $("#randomFlagsPerCard").value, 2, 6);
  const requestedItems = worksheet ? worksheetCount * worksheetItemsPerPage : cardCount * flagsPerCard;
  const groupSize = worksheet ? worksheetItemsPerPage : flagsPerCard;
  const difficulty = options?.difficulty ?? $("#randomDifficulty").value;
  const legacyContinent = options?.continent;
  const continents = options?.continents ?? (legacyContinent ? (legacyContinent === "any" ? [] : [legacyContinent]) : getSelectedContinents());
  const groups = options?.groups ?? getSelectedGroups();
  const frontModes = options?.frontModes ?? $$(".random-content:checked").map((checkbox) => checkbox.value);
  if (!frontModes.length || frontModes.some((mode) => !FRONT_MODES.includes(mode))) {
    $("#randomStatus").textContent = "Choose at least one question content type.";
    return null;
  }
  const allowRepeats = options?.allowRepeats ?? $("#allowRepeats").checked;
  const useAllCountries = options?.useAllCountries ?? $("#useAllCountries").checked;
  const pool = getPool(difficulty, continents, groups);
  const totalItems = useAllCountries ? pool.length : requestedItems;
  if (pool.length < 2) {
    $("#randomStatus").textContent = `Only ${pool.length} country matches. Choose a wider filter.`;
    return null;
  }
  if (allowRepeats && pool.length < Math.min(groupSize, totalItems)) {
    $("#randomStatus").textContent = `Only ${pool.length} countries match, which is not enough to keep one card or sheet free of duplicates.`;
    return null;
  }
  if (!allowRepeats && totalItems > pool.length) {
    $("#randomStatus").textContent = `${pool.length} countries match, but ${totalItems} clues were requested. Reduce the count, enable repeats, or use every matching country once.`;
    return null;
  }
  let bag = shuffle([...pool]);
  const cards = [];
  let recycled = false;
  let remaining = totalItems;
  let modeBag = [];
  const takeFrontMode = () => { if (!modeBag.length) modeBag = shuffle([...frontModes]); return modeBag.pop(); };
  while (remaining > 0) {
    const countries = [];
    const targetSize = Math.min(groupSize, remaining);
    while (countries.length < targetSize) {
      if (!bag.length) {
        if (!allowRepeats) {
          $("#randomStatus").textContent = `All ${pool.length} matching countries have already been used once.`;
          return null;
        }
        recycled = true;
        bag = shuffle([...pool]);
      }
      const candidate = bag.pop();
      if (!countries.some((country) => country.iso2 === candidate.iso2)) countries.push(candidate);
    }
    cards.push({ difficulty: difficulty === "mixed" ? inferCardDifficulty(countries) : difficulty, countries, shapeColors: createShapeColors(countries.length), frontModes: countries.map(takeFrontMode) });
    remaining -= targetSize;
  }
  state.cards = cards;
  state.frontMode = frontModes.length === 1 ? frontModes[0] : "mixed";
  $("#frontMode").value = state.frontMode;
  state.outputMode = outputMode;
  if (worksheet) {
    state.worksheetSize = worksheetFormat.id;
    state.worksheetItemsPerPage = worksheetItemsPerPage;
    state.orientation = state.worksheetOrientation;
  } else {
    state.itemsPerCard = flagsPerCard;
    state.orientation = state.cardOrientation;
  }
  const groupLabels = groups.filter((group) => group !== "recognized").map((group) => group.toUpperCase());
  const geographicScope = !continents.length ? "World" : continents.length <= 2 ? continents.join(" + ") : `${continents.length} continents`;
  const scope = groupLabels.length ? `${groupLabels.join(" + ")} ${geographicScope}` : geographicScope;
  const contentLabel = frontModes.length === 1 ? ({ flags: "flag", silhouettes: "silhouette", capitals: "capital" })[frontModes[0]] : "country clue";
  state.title = worksheet ? `${scope} ${contentLabel} worksheets` : `${scope} ${contentLabel} mix`;
  state.criteria = `Random ${scope.toLowerCase()} selection using ${frontModes.join(", ")}${difficulty === "mixed" ? "" : `, ${difficulty} recognition`}`;
  state.deckId = createDeckId();
  if (worksheet) {
    const generatedWorksheetCount = cards.length;
    $("#randomStatus").textContent = `${generatedWorksheetCount} ${worksheetFormat.id.toUpperCase()} worksheet${generatedWorksheetCount === 1 ? "" : "s"} generated with ${totalItems} unique clue${totalItems === 1 ? "" : "s"}${recycled ? "; the full matching pool was used before repeats began" : ", with no repeats"}.`;
  } else {
    const generatedCardCount = cards.length;
    $("#randomStatus").textContent = recycled
      ? `${generatedCardCount} cards generated. The full matching pool was used before repeats began.`
      : `${generatedCardCount} cards generated with ${totalItems} unique countries and no repeats.`;
  }
  updateDeckUI();
  showView("deckView");
  showToast(worksheet ? `${cards.length} worksheets generated` : `${cards.length} cards generated`);
  return cards;
}

function inferCardDifficulty(countries) {
  const scores = { easy: 1, medium: 2, hard: 3 };
  const average = countries.reduce((sum, country) => sum + scores[getDifficulty(country)], 0) / countries.length;
  return average < 1.67 ? "easy" : average < 2.34 ? "medium" : "hard";
}

function createShapeColors(count) {
  return shuffle([...SHAPE_COLORS]).slice(0, count);
}

function normalizeShapeColors(colors, count) {
  if (!Array.isArray(colors) || colors.length !== count) return createShapeColors(count);
  const normalized = colors.map((color) => String(color).toUpperCase());
  const valid = normalized.every((color) => SHAPE_COLORS.includes(color)) && new Set(normalized).size === count;
  return valid ? normalized : createShapeColors(count);
}

function updateDeckUI() {
  populatePrintSizes();
  $("#deckCountBadge").textContent = state.cards.length;
  $("#deckTitle").textContent = state.title;
  $("#deckCriteria").textContent = state.criteria;
  $("#deckCriteria").hidden = !state.criteria;
  $("#emptyDeck").hidden = state.cards.length > 0;
  $("#deckWorkspace").hidden = state.cards.length === 0;
  if (state.cards.length) renderDeck();
}

function renderDeck() {
  const geometry = getGeometry();
  const worksheet = geometry.kind === "worksheet";
  const worksheetPages = worksheet ? getWorksheetPages() : [];
  const activityCount = worksheet ? worksheetPages.length : state.cards.length;
  $("#deckCountBadge").textContent = activityCount;
  $("#cardList").classList.toggle("worksheet-list", worksheet);
  const itemTotal = state.cards.reduce((sum, card) => sum + card.countries.length, 0);
  const uniqueTotal = new Set(state.cards.flatMap((card) => card.countries.map((country) => country.iso2))).size;
  const itemLabel = state.frontMode === "silhouettes" ? "shape clues" : state.frontMode === "capitals" ? "capital clues" : state.frontMode === "mixed" ? "mixed clues" : "flag clues";
  $("#deckSummary").innerHTML = [
    `<span class="summary-chip"><strong>${activityCount}</strong> ${worksheet ? `worksheet page${activityCount === 1 ? "" : "s"}` : `card${activityCount === 1 ? "" : "s"}`}</span>`,
    `<span class="summary-chip"><strong>${itemTotal}</strong> ${itemLabel}</span>`,
    `<span class="summary-chip"><strong>${uniqueTotal}</strong> unique countries</span>`,
    `<span class="summary-chip"><strong>${activityCount * 2}</strong> PDF pages</span>`
  ].join("");
  $("#pdfNote").innerHTML = worksheet
    ? `<strong>Write-under mode:</strong> The whole deck is repacked at ${geometry.itemsPerPage} items per ${geometry.formatId.toUpperCase()} page, followed by matching answer pages. ${itemTotal} placements make ${activityCount} worksheet page${activityCount === 1 ? "" : "s"}.`
    : `<strong>PDF order:</strong> Card 1 front, Card 1 back, Card 2 front, Card 2 back. ${geometry.label} trim is ${geometry.trimW} × ${geometry.trimH} mm; ${state.orientation === "landscape" ? "horizontal" : "vertical"} PDF pages are ${geometry.pageW} × ${geometry.pageH} mm including ${geometry.bleedMm} mm bleed. TrimBox and BleedBox are embedded.`;
  $("#cardList").innerHTML = worksheet
    ? worksheetPages.map((page, index) => previewWorksheetPage(page, index, worksheetPages.length)).join("")
    : state.cards.map((card, index) => previewCard(card, index)).join("");
  void renderPreviewSilhouettes();
  $$("[data-remove-card]").forEach((button) => button.addEventListener("click", () => {
    const index = Number(button.dataset.removeCard);
    state.cards.splice(index, 1);
    updateDeckUI();
  }));
}

function previewCard(card, index) {
  const number = String(index + 1).padStart(2, "0");
  const background = state.backgroundColor;
  const ink = readableTextColor(background);
  const frontItems = card.countries.map((country, countryIndex) => previewVisual(country, card.shapeColors[countryIndex], getFrontMode(card, countryIndex))).join("");
  const answers = card.countries.map((country, countryIndex) => getFrontMode(card, countryIndex) === "silhouettes"
    ? `<div class="answer-row silhouette-answer">${silhouetteMarkup(country, card.shapeColors[countryIndex], "answer-shape")}<img class="answer-flag" src="${country.flag}" alt=""><span>${escapeHtml(country.name)}</span></div>`
    : `<div class="answer-row"><img class="answer-flag" src="${country.flag}" alt=""><span>${escapeHtml(country.name)}</span></div>`).join("");
  const geometry = getGeometry();
  const faceStyle = `--card-ratio:${geometry.pageW} / ${geometry.pageH};background:${background}`;
  return `<article class="card-pair">
    <div class="card-pair-heading"><span>Card ${number} · ${escapeHtml(card.difficulty)}</span><button type="button" data-remove-card="${index}">Remove</button></div>
    <div class="faces">
      <div class="card-face front ${state.orientation}" style="${faceStyle};color:${ink}"><div class="preview-items ${state.frontMode} count-${card.countries.length}">${frontItems}</div></div>
      <div class="card-face back ${state.orientation}" style="${faceStyle};color:${ink}"><div class="answer-list">${answers}</div><div class="back-meta"><span>${escapeHtml(state.deckId)}</span><span>${index + 1} / ${state.cards.length}</span></div></div>
    </div>
  </article>`;
}

function getWorksheetPages() {
  const capacity = state.worksheetItemsPerPage;
  const placements = getPlacements();
  const pages = [];
  for (let index = 0; index < placements.length; index += capacity) {
    const slice = placements.slice(index, index + capacity);
    pages.push({ countries: slice.map((item) => item.country), shapeColors: slice.map((item) => item.shapeColor), frontModes: slice.map((item) => item.frontMode), difficulty: "mixed" });
  }
  return pages;
}

function previewWorksheetPage(page, index, pageTotal) {
  const background = state.backgroundColor;
  const ink = readableTextColor(background);
  const geometry = getGeometry();
  const columns = getWorksheetColumns(page.countries.length, geometry);
  const faceStyle = `--card-ratio:${geometry.pageW} / ${geometry.pageH};background:${background}`;
  const worksheetItems = page.countries.map((country, countryIndex) => {
    const visual = previewVisual(country, page.shapeColors[countryIndex], getFrontMode(page, countryIndex));
    return `<div class="write-under-item">${visual}<span class="write-line" aria-label="Blank answer line"></span></div>`;
  }).join("");
  const answerItems = page.countries.map((country, countryIndex) => {
    const visual = previewVisual(country, page.shapeColors[countryIndex], getFrontMode(page, countryIndex));
    return `<div class="write-under-item answer-item">${visual}<strong>${escapeHtml(country.name)}</strong></div>`;
  }).join("");
  return `<article class="card-pair worksheet-pair">
    <div class="card-pair-heading"><span>Worksheet ${String(index + 1).padStart(2, "0")} · ${page.countries.length} items</span></div>
    <div class="faces">
      <div class="card-face worksheet ${geometry.formatId} front ${state.orientation}" style="${faceStyle};color:${ink}"><div class="worksheet-grid count-${page.countries.length}" style="--worksheet-cols:${columns}">${worksheetItems}</div></div>
      <div class="card-face worksheet ${geometry.formatId} back ${state.orientation}" style="${faceStyle};color:${ink}"><div class="worksheet-grid count-${page.countries.length}" style="--worksheet-cols:${columns}">${answerItems}</div><div class="back-meta"><span>ANSWERS</span><span>${index + 1} / ${pageTotal}</span></div></div>
    </div>
  </article>`;
}

function silhouetteMarkup(country, color, className) {
  return `<canvas class="silhouette-canvas ${className}" data-silhouette-src="${escapeHtml(country.silhouette)}" data-shape-color="${color}" aria-hidden="true"></canvas>`;
}

function getFrontMode(card, index) { return state.frontMode === "mixed" ? (card.frontModes?.[index] || "flags") : state.frontMode; }
function previewVisual(country, color, mode) {
  if (mode === "silhouettes") return silhouetteMarkup(country, color, "silhouette-tile");
  if (mode === "capitals") return `<div class="capital-tile">${escapeHtml(country.capital || "No official capital")}</div>`;
  return `<div class="flag-tile"><img src="${country.flag}" alt=""></div>`;
}

async function renderPreviewSilhouettes() {
  const scale = Math.min(2, window.devicePixelRatio || 1);
  await Promise.all($$(".silhouette-canvas").map(async (canvas) => {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const image = await loadImage(canvas.dataset.silhouetteSrc);
    if (!canvas.isConnected) return;
    canvas.width = Math.max(1, Math.round(rect.width * scale));
    canvas.height = Math.max(1, Math.round(rect.height * scale));
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawOutlinedSilhouette(ctx, image, 0, 0, canvas.width, canvas.height, canvas.dataset.shapeColor, Math.max(1, Math.round(scale)), Math.max(1, Math.round(scale)));
  }));
}

async function exportPdf() {
  if (!state.cards.length) return;
  const button = $("#exportPdfButton");
  const oldText = button.textContent;
  button.disabled = true;
  try {
    const sourcePages = state.outputMode === "worksheet" ? getWorksheetPages() : state.cards;
    const pages = [];
    for (let index = 0; index < sourcePages.length; index += 1) {
      button.textContent = `Rendering ${index + 1}/${sourcePages.length}`;
      const front = await renderCardCanvas(sourcePages[index], "front", index, sourcePages.length);
      const back = await renderCardCanvas(sourcePages[index], "back", index, sourcePages.length);
      pages.push(canvasJpegBytes(front), canvasJpegBytes(back));
      await nextFrame();
    }
    button.textContent = "Building PDF";
    const geometry = getGeometry();
    const pdf = buildPdf(pages, geometry.canvasW, geometry.canvasH, geometry.pageW, geometry.pageH, geometry.bleedMm);
    const product = geometry.kind === "worksheet" ? `${geometry.formatId}-write-under` : `${state.cards.length}-cards`;
    downloadBlob(pdf, `${fileSafe(state.title)}-${product}.pdf`);
    showToast(`PDF exported: ${sourcePages.length * 2} pages`);
  } catch (error) {
    console.error(error);
    showToast(`PDF export failed: ${error.message}`);
  } finally {
    button.disabled = false;
    button.textContent = oldText;
  }
}

async function renderCardCanvas(card, side, cardIndex, pageTotal = state.cards.length) {
  const geometry = getGeometry();
  const canvas = document.createElement("canvas");
  canvas.width = geometry.canvasW;
  canvas.height = geometry.canvasH;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  const flagImages = await Promise.all(card.countries.map((country) => loadImage(country.flag)));
  const needsSilhouettes = card.countries.some((_, index) => getFrontMode(card, index) === "silhouettes");
  const silhouetteImages = needsSilhouettes
    ? await Promise.all(card.countries.map((country) => loadImage(country.silhouette)))
    : [];
  if (geometry.kind === "worksheet") {
    drawWorksheetPage(ctx, card, flagImages, silhouetteImages, side === "back", cardIndex, pageTotal);
  } else if (side === "front") drawFront(ctx, card, flagImages, silhouetteImages);
  else drawBack(ctx, card, flagImages, silhouetteImages, cardIndex);
  return canvas;
}

function drawWorksheetPage(ctx, card, flagImages, silhouetteImages, showAnswers, cardIndex, pageTotal) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const mm = PX_PER_MM;
  const geometry = getGeometry();
  const safe = geometry.safeMarginMm * mm;
  const count = card.countries.length;
  const cols = getWorksheetColumns(count, geometry);
  const rows = Math.ceil(count / cols);
  const gapX = (geometry.formatId === "a4" ? 8 : 7) * mm;
  const gapY = (geometry.formatId === "a4" ? 7 : 6) * mm;
  const footerH = showAnswers ? 7 * mm : 0;
  const gridW = w - safe * 2;
  const gridH = h - safe * 2 - footerH;
  const cellW = (gridW - gapX * (cols - 1)) / cols;
  const cellH = (gridH - gapY * (rows - 1)) / rows;
  const answerH = (geometry.formatId === "a4" ? 14 : 12) * mm;
  const ink = readableTextColor(state.backgroundColor);
  ctx.fillStyle = state.backgroundColor;
  ctx.fillRect(0, 0, w, h);
  card.countries.forEach((country, index) => {
    const col = cols === 1 ? 0 : index % cols;
    const row = cols === 1 ? index : Math.floor(index / cols);
    const x = safe + col * (cellW + gapX);
    const y = safe + row * (cellH + gapY);
    const visualH = Math.max(1, cellH - answerH - 2 * mm);
    drawVisualTile(ctx, country, getFrontMode(card, index), flagImages[index], silhouetteImages[index], x, y, cellW, visualH, card.shapeColors[index]);
    const lineY = y + cellH - 2.5 * mm;
    if (showAnswers) {
      ctx.fillStyle = ink;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = fitFont(ctx, country.name, 6 * mm, 3.2 * mm, cellW * .92, "700", "Arial");
      ctx.fillText(country.name, x + cellW / 2, lineY, cellW * .92);
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
    } else {
      ctx.save();
      ctx.strokeStyle = ink;
      ctx.globalAlpha = .72;
      ctx.lineWidth = .35 * mm;
      ctx.beginPath();
      ctx.moveTo(x + cellW * .08, lineY);
      ctx.lineTo(x + cellW * .92, lineY);
      ctx.stroke();
      ctx.restore();
    }
  });
  if (showAnswers) {
    ctx.fillStyle = ink;
    ctx.globalAlpha = .62;
    ctx.font = `600 ${2.6 * mm}px Consolas, monospace`;
    ctx.fillText("ANSWERS", safe, h - safe + 1 * mm);
    ctx.textAlign = "right";
    ctx.fillText(`${cardIndex + 1} / ${pageTotal}`, w - safe, h - safe + 1 * mm);
    ctx.textAlign = "left";
    ctx.globalAlpha = 1;
  }
}

function getWorksheetColumns(count, geometry = getGeometry()) {
  const landscape = geometry.pageW > geometry.pageH;
  if (landscape) {
    if (count <= 3) return count;
    if (count <= 6) return 3;
    return 4;
  }
  if (count <= 2) return count;
  if (count <= 8) return 2;
  return 3;
}

function drawFront(ctx, card, flagImages, silhouetteImages) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const mm = PX_PER_MM;
  const safe = (BLEED_MM + SAFE_MARGIN_MM) * mm;
  ctx.fillStyle = state.backgroundColor;
  ctx.fillRect(0, 0, w, h);
  const count = card.countries.length;
  const landscape = w > h;
  const cols = landscape ? (count <= 3 ? count : count === 4 ? 2 : 3) : (count <= 3 ? 1 : 2);
  const rows = Math.ceil(count / cols);
  const gapX = 3.3 * mm;
  const gapY = 3.1 * mm;
  const gridTop = safe;
  const gridBottom = h - safe;
  const gridW = w - safe * 2;
  const gridH = gridBottom - gridTop;
  const cellW = (gridW - gapX * (cols - 1)) / cols;
  const cellH = (gridH - gapY * (rows - 1)) / rows;
  card.countries.forEach((country, index) => {
    const col = cols === 1 ? 0 : index % cols;
    const row = cols === 1 ? index : Math.floor(index / cols);
    const x = safe + col * (cellW + gapX);
    const y = gridTop + row * (cellH + gapY);
    drawVisualTile(ctx, country, getFrontMode(card, index), flagImages[index], silhouetteImages[index], x, y, cellW, cellH, card.shapeColors[index]);
  });
}

function drawVisualTile(ctx, country, mode, flagImage, silhouetteImage, x, y, w, h, color) {
  if (mode === "silhouettes") drawSilhouetteTile(ctx, silhouetteImage, x, y, w, h, color);
  else if (mode === "capitals") drawCapitalTile(ctx, country.capital || "No official capital", x, y, w, h);
  else drawFlagTile(ctx, flagImage, x, y, w, h);
}

function drawCapitalTile(ctx, capital, x, y, w, h) {
  const mm = PX_PER_MM;
  const ink = readableTextColor(state.backgroundColor);
  const inset = Math.min(2.2 * mm, w * .06, h * .1);
  ctx.save(); ctx.strokeStyle = ink; ctx.fillStyle = ink; ctx.globalAlpha = .94; ctx.lineWidth = Math.max(1, .55 * mm);
  roundRect(ctx, x + inset, y + inset, w - inset * 2, h - inset * 2, Math.min(3 * mm, h * .12)).stroke();
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.font = fitFont(ctx, capital, Math.min(9 * mm, h * .24), 3.2 * mm, w - inset * 4, "800", "Arial");
  ctx.fillText(capital, x + w / 2, y + h / 2, w - inset * 4); ctx.restore();
}

function drawFlagTile(ctx, image, x, y, w, h) {
  const fitted = containRect(image, x, y, w, h);
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,.26)";
  ctx.shadowBlur = 2.2 * PX_PER_MM;
  ctx.shadowOffsetY = 1.2 * PX_PER_MM;
  ctx.drawImage(image, fitted.x, fitted.y, fitted.w, fitted.h);
  ctx.restore();
}

function drawSilhouetteTile(ctx, image, x, y, w, h, color) {
  const inset = 1.2 * PX_PER_MM;
  drawOutlinedSilhouette(ctx, image, x + inset, y + inset, w - inset * 2, h - inset * 2, color, 0.2 * PX_PER_MM);
}

function drawOutlinedSilhouette(ctx, image, x, y, w, h, color, strokePx, insetPx = 0) {
  const fitted = containRect(image, x + insetPx, y + insetPx, w - insetPx * 2, h - insetPx * 2);
  const pixelW = Math.max(1, Math.round(fitted.w));
  const pixelH = Math.max(1, Math.round(fitted.h));
  const outlined = getOutlinedSilhouette(image, color, pixelW, pixelH, strokePx);
  ctx.drawImage(outlined, fitted.x, fitted.y, fitted.w, fitted.h);
}

function getOutlinedSilhouette(image, color, width, height, strokePx) {
  const radius = Math.max(1, Math.round(strokePx));
  const key = `${image.src}|${color}|${width}x${height}|${radius}`;
  if (state.silhouetteRenderCache.has(key)) return state.silhouetteRenderCache.get(key);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const tint = canvas.getContext("2d", { willReadFrequently: true });
  tint.drawImage(image, 0, 0, width, height);
  const imageData = tint.getImageData(0, 0, width, height);
  const pixels = imageData.data;
  const alpha = new Uint8Array(width * height);
  for (let pixelIndex = 0; pixelIndex < alpha.length; pixelIndex += 1) alpha[pixelIndex] = pixels[pixelIndex * 4 + 3];
  const fill = parseHexColor(color);
  const offsets = [];
  for (let dy = -radius; dy <= radius; dy += 1) {
    for (let dx = -radius; dx <= radius; dx += 1) {
      if (dx * dx + dy * dy <= radius * radius) offsets.push([dx, dy]);
    }
  }
  for (let py = 0; py < height; py += 1) {
    for (let px = 0; px < width; px += 1) {
      const index = py * width + px;
      if (!alpha[index]) continue;
      const edge = offsets.some(([dx, dy]) => {
        const nx = px + dx;
        const ny = py + dy;
        return nx < 0 || ny < 0 || nx >= width || ny >= height || alpha[ny * width + nx] < 48;
      });
      const dataIndex = index * 4;
      pixels[dataIndex] = edge ? 17 : fill[0];
      pixels[dataIndex + 1] = edge ? 17 : fill[1];
      pixels[dataIndex + 2] = edge ? 17 : fill[2];
    }
  }
  tint.putImageData(imageData, 0, 0);
  state.silhouetteRenderCache.set(key, canvas);
  return canvas;
}

function parseHexColor(hex) {
  const value = String(hex || "#D83A34").replace("#", "");
  return [parseInt(value.slice(0, 2), 16), parseInt(value.slice(2, 4), 16), parseInt(value.slice(4, 6), 16)];
}

function drawBack(ctx, card, flagImages, silhouetteImages, cardIndex) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const mm = PX_PER_MM;
  const safe = (BLEED_MM + SAFE_MARGIN_MM) * mm;
  const ink = readableTextColor(state.backgroundColor);
  ctx.fillStyle = state.backgroundColor;
  ctx.fillRect(0, 0, w, h);
  const listTop = safe + 2 * mm;
  const listBottom = h - safe - 7 * mm;
  const columns = w > h && card.countries.length >= 4 ? 2 : 1;
  const rows = Math.ceil(card.countries.length / columns);
  const gap = 1.7 * mm;
  const columnGap = 2.3 * mm;
  const rowH = Math.min(11 * mm, (listBottom - listTop - gap * (rows - 1)) / rows);
  const listH = rowH * rows + gap * (rows - 1);
  const yStart = listTop + Math.max(0, (listBottom - listTop - listH) / 2);
  card.countries.forEach((country, index) => {
    const column = columns === 1 ? 0 : index % columns;
    const row = columns === 1 ? index : Math.floor(index / columns);
    const rowW = (w - safe * 2 - columnGap * (columns - 1)) / columns;
    const x = safe + column * (rowW + columnGap);
    const y = yStart + row * (rowH + gap);
    const flagH = rowH - 2.4 * mm;
    let textX;
    let maxTextW;
    if (getFrontMode(card, index) === "silhouettes") {
      const shapeW = Math.min(8.5 * mm, rowW * .18);
      const flagW = Math.min(11 * mm, rowW * .22);
      const itemGap = 1.5 * mm;
      drawSilhouetteTile(ctx, silhouetteImages[index], x + .5 * mm, y + 1.2 * mm, shapeW, flagH, card.shapeColors[index]);
      drawImageContain(ctx, flagImages[index], x + shapeW + itemGap, y + 1.2 * mm, flagW, flagH);
      textX = x + shapeW + flagW + itemGap * 2;
      maxTextW = rowW - shapeW - flagW - itemGap * 2 - 1 * mm;
    } else {
      const flagW = Math.min(13 * mm, rowW * .25);
      drawImageContain(ctx, flagImages[index], x + 1.3 * mm, y + 1.2 * mm, flagW, flagH);
      textX = x + flagW + 3.2 * mm;
      maxTextW = rowW - flagW - 5 * mm;
    }
    ctx.fillStyle = ink;
    ctx.textBaseline = "middle";
    ctx.font = fitFont(ctx, country.name, 4.1 * mm, 2.45 * mm, maxTextW, "700", "Arial");
    ctx.fillText(country.name, textX, y + rowH / 2, maxTextW);
    ctx.textBaseline = "alphabetic";
  });
  ctx.fillStyle = ink;
  ctx.globalAlpha = .62;
  ctx.font = `600 ${2.2 * mm}px Consolas, monospace`;
  ctx.textBaseline = "alphabetic";
  const deckId = state.deckId || createDeckId();
  const position = `${cardIndex + 1} / ${state.cards.length}`;
  ctx.fillText(deckId, safe, h - safe + 1 * mm);
  ctx.textAlign = "right";
  ctx.fillText(position, w - safe, h - safe + 1 * mm);
  ctx.textAlign = "left";
  ctx.globalAlpha = 1;
}

function fitFont(ctx, text, maxPx, minPx, width, weight, family) {
  let size = maxPx;
  while (size > minPx) {
    ctx.font = `${weight} ${size}px ${family}`;
    if (ctx.measureText(text).width <= width) break;
    size -= 1;
  }
  return `${weight} ${size}px ${family}`;
}

function drawImageContain(ctx, image, x, y, w, h) {
  const fitted = containRect(image, x, y, w, h);
  ctx.drawImage(image, fitted.x, fitted.y, fitted.w, fitted.h);
}

function containRect(image, x, y, w, h) {
  const scale = Math.min(w / image.naturalWidth, h / image.naturalHeight);
  const fittedW = image.naturalWidth * scale;
  const fittedH = image.naturalHeight * scale;
  return { x: x + (w - fittedW) / 2, y: y + (h - fittedH) / 2, w: fittedW, h: fittedH };
}

function roundRect(ctx, x, y, w, h, radius) {
  const r = Math.min(radius, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  return ctx;
}

function loadImage(src) {
  if (state.imageCache.has(src)) return state.imageCache.get(src);
  const promise = new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load ${src}`));
    image.src = src;
  });
  state.imageCache.set(src, promise);
  return promise;
}

function canvasJpegBytes(canvas) {
  const base64 = canvas.toDataURL("image/jpeg", .94).split(",")[1];
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

function buildPdf(jpegPages, imageWidth, imageHeight, pageWidthMm = getGeometry().pageW, pageHeightMm = getGeometry().pageH, bleedMm = BLEED_MM) {
  const encoder = new TextEncoder();
  const ascii = (value) => encoder.encode(value);
  const pageW = (pageWidthMm * 72 / 25.4).toFixed(4);
  const pageH = (pageHeightMm * 72 / 25.4).toFixed(4);
  const bleed = bleedMm * 72 / 25.4;
  const trimLeft = bleed.toFixed(4);
  const trimBottom = bleed.toFixed(4);
  const trimRight = (Number(pageW) - bleed).toFixed(4);
  const trimTop = (Number(pageH) - bleed).toFixed(4);
  const objectCount = 2 + jpegPages.length * 3;
  const objects = new Array(objectCount + 1);
  const pageRefs = jpegPages.map((_, index) => 5 + index * 3);
  objects[1] = [ascii("<< /Type /Catalog /Pages 2 0 R >>")];
  objects[2] = [ascii(`<< /Type /Pages /Count ${jpegPages.length} /Kids [${pageRefs.map((id) => `${id} 0 R`).join(" ")}] >>`)];
  jpegPages.forEach((jpeg, index) => {
    const imageId = 3 + index * 3;
    const contentId = imageId + 1;
    const pageId = imageId + 2;
    const content = ascii(`q\n${pageW} 0 0 ${pageH} 0 0 cm\n/Im0 Do\nQ\n`);
    objects[imageId] = [ascii(`<< /Type /XObject /Subtype /Image /Width ${imageWidth} /Height ${imageHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpeg.length} >>\nstream\n`), jpeg, ascii("\nendstream")];
    objects[contentId] = [ascii(`<< /Length ${content.length} >>\nstream\n`), content, ascii("endstream")];
    objects[pageId] = [ascii(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /CropBox [0 0 ${pageW} ${pageH}] /BleedBox [0 0 ${pageW} ${pageH}] /TrimBox [${trimLeft} ${trimBottom} ${trimRight} ${trimTop}] /Resources << /XObject << /Im0 ${imageId} 0 R >> >> /Contents ${contentId} 0 R >>`)];
  });
  const chunks = [ascii("%PDF-1.4\n%1234\n")];
  const offsets = new Array(objectCount + 1).fill(0);
  let length = chunks[0].length;
  for (let id = 1; id <= objectCount; id += 1) {
    offsets[id] = length;
    const head = ascii(`${id} 0 obj\n`);
    const tail = ascii("\nendobj\n");
    chunks.push(head, ...objects[id], tail);
    length += head.length + objects[id].reduce((sum, chunk) => sum + chunk.length, 0) + tail.length;
  }
  const xrefOffset = length;
  let xref = `xref\n0 ${objectCount + 1}\n0000000000 65535 f \n`;
  for (let id = 1; id <= objectCount; id += 1) xref += `${String(offsets[id]).padStart(10, "0")} 00000 n \n`;
  xref += `trailer\n<< /Size ${objectCount + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  chunks.push(ascii(xref));
  return new Blob(chunks, { type: "application/pdf" });
}

function downloadDeckJson() {
  const geometry = getGeometry();
  const placements = getPlacements();
  const countries = placements.map((placement) => placement.country.name);
  const data = {
    title: state.title,
    criteria: state.criteria,
    deckId: state.deckId,
    countries,
    format: { outputMode: state.outputMode, cardFormat: state.cardFormat, worksheetSize: state.worksheetSize, worksheetItemsPerPage: state.worksheetItemsPerPage, itemsPerCard: state.itemsPerCard, frontMode: state.frontMode, frontModes: placements.map((placement) => placement.frontMode), orientation: state.orientation, trimMm: [geometry.trimW, geometry.trimH], bleedMm: geometry.bleedMm, safeMarginMm: geometry.safeMarginMm, backgroundColor: state.backgroundColor }
  };
  downloadBlob(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }), `${fileSafe(state.title)}.json`);
}

function downloadBlob(blob, filename) {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function getGeometry() {
  const format = state.outputMode === "worksheet"
    ? WORKSHEET_FORMATS[state.worksheetSize] || WORKSHEET_FORMATS.a4
    : CARD_FORMATS[state.cardFormat] || CARD_FORMATS.poker;
  const landscape = state.orientation === "landscape";
  const portraitPageW = format.trimW + format.bleedMm * 2;
  const portraitPageH = format.trimH + format.bleedMm * 2;
  const pageW = landscape ? portraitPageH : portraitPageW;
  const pageH = landscape ? portraitPageW : portraitPageH;
  const trimW = landscape ? format.trimH : format.trimW;
  const trimH = landscape ? format.trimW : format.trimH;
  return { formatId: format.id, label: format.label, kind: format.kind, itemsPerPage: format.kind === "worksheet" ? state.worksheetItemsPerPage : null, bleedMm: format.bleedMm, safeMarginMm: format.safeMarginMm, pageW, pageH, trimW, trimH, canvasW: Math.round(pageW * PX_PER_MM), canvasH: Math.round(pageH * PX_PER_MM) };
}

function createDeckId(date = new Date()) {
  const pad = (value) => String(value).padStart(2, "0");
  const stamp = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
  return `${stamp}-${Math.floor(100 + Math.random() * 900)}`;
}

function readableTextColor(hex) {
  const value = String(hex || "#e6e8e5").replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > .58 ? "#252a2a" : "#f7f7f3";
}

function randomMutedColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 8 + Math.floor(Math.random() * 17);
  const lightness = 76 + Math.floor(Math.random() * 15);
  return hslToHex(hue, saturation, lightness);
}

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const x = chroma * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - chroma / 2;
  let rgb = h < 60 ? [chroma, x, 0] : h < 120 ? [x, chroma, 0] : h < 180 ? [0, chroma, x] : h < 240 ? [0, x, chroma] : h < 300 ? [x, 0, chroma] : [chroma, 0, x];
  return `#${rgb.map((value) => Math.round((value + m) * 255).toString(16).padStart(2, "0")).join("")}`;
}

function clampInt(value, min, max) { return Math.max(min, Math.min(max, Math.round(Number(value) || min))); }
function shuffle(values) {
  for (let index = values.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [values[index], values[swapIndex]] = [values[swapIndex], values[index]];
  }
  return values;
}
function fileSafe(value) { return String(value || "flag-deck").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "flag-deck"; }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]); }
function nextFrame() { return new Promise((resolve) => requestAnimationFrame(() => resolve())); }
let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}
