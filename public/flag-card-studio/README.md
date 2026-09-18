# Flag Card Studio

A browser app for researching a country set by a flag criterion, then laying the
same set out as Poker- or Tarot-size guessing cards or A4/A5 write-under
worksheets. It is embedded in YouTube Quiz Generator and continues to work
without an account, API, or server-side processing.

## Open

Open **Flag Card Studio** from the YouTube Quiz Generator landing page. In the
static build, its route is `flag-card-studio/`.

## Start

Open it from YouTube Quiz Generator, double-click `run-card-studio.bat`, or run
a local web server in this folder and open `http://localhost:8765`.

## Card format

- Poker trim: 63.5 x 88.9 mm
- Tarot trim: 70 x 120 mm
- Bleed: 3 mm on every edge
- Default deck: four cards in horizontal orientation
- Imported country sets can be regrouped as 2-6 flags per card after import
- Orientation can still be switched between horizontal and vertical
- Safe margin: fixed at 5 mm
- PDF page: selected trim size plus 3 mm on every edge
- Every page declares its full-size MediaBox/BleedBox and an inset TrimBox, so print software recognizes the bleed correctly
- Order: each card front followed by its matching back
- Flag mode front: flags only, without titles, labels, country names, or numbers
- Flag mode back: small flags with country names, without numbers
- Silhouette mode front: country shapes with a consistent pixel-rendered black inset outline and distinct, familiar colours
- Silhouette mode back: the matching coloured shape, flag, and country name
- Silhouette colours are randomly chosen without repeats on each card from a dye-inspired red, blue, yellow, green, orange, purple, pink, cyan, lime, and brown palette
- Background: choose any colour or generate a random muted colour
- The chosen solid background extends through the full 3 mm bleed area
- Backs contain only the country answers, a generated date-time ID, and card position such as `1 / 20`
- No headings, frames, stripes, row boxes, decorative lines, or branding are printed

## Write-under worksheets

- A4: 210 x 297 mm with 4, 6, 8, 9, or 12 flags per sheet
- A5: 148 x 210 mm with 2, 4, or 6 flags per sheet
- Worksheet is a separate output mode from guessing cards; choosing it does not change the card-size setting
- Available in horizontal or vertical orientation
- Choose the paper size first, then choose how many flags appear on each sheet
- The full country set is automatically flowed across as many sheets as required
- Random picker asks for the output mode first. Worksheet mode asks for paper size, flags per sheet, and number of worksheet pages; card-specific counts stay hidden.
- Random picker can use flags, country silhouettes, capital-name boxes, or a balanced mix of all selected clue types.
- Continents are multi-select checkboxes, so one random set can combine any chosen regions.
- Every flag or silhouette has a clean blank line directly underneath for writing the country name
- Every worksheet is followed by a matching answer-key page with the names in the same positions
- Worksheet and answer previews are stacked at a readable full-page width instead of being squeezed side by side
- Worksheets use the selected background colour and flag/silhouette mode; the imported country set is automatically flowed onto pages
- A4/A5 pages have no bleed; their MediaBox, BleedBox, and TrimBox all match the finished sheet size

Flags are fitted using their original aspect ratio without cropping or an added
white frame.

PDF files are generated entirely in the browser at 300 DPI. No upload, account,
API, or live AI connection is used. Gemini is used by copying a generated prompt
and pasting the returned JSON back into the app.

## JSON format

```json
{
  "title": "Flags with an animal",
  "criteria": "The national flag visibly features an animal",
  "countries": ["Bhutan", "Mexico", "Uganda"]
}
```

`flags` may be used instead of `countries`. Country names, ISO-2 and ISO-3 codes
are accepted. The main format is one flat list of distinct countries; the app
handles the card and worksheet grouping afterward. Legacy JSON with a `cards`
array and 2-6 distinct countries per card remains supported.

Exported deck JSON records `format.frontMode` as either `flags` or
`silhouettes`, together with the output mode, card size, worksheet size, flags
per card, orientation, format-specific safe margin, and background colour.
Re-importing restores those choices. Older imports without `format.frontMode`
continue to open as flag decks.

See [CREDITS.md](CREDITS.md) for artwork and geographic-data attribution.
