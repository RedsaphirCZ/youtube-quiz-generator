# DaVinci Resolve Quiz Timeline Builder

This Resolve 21+ script reads the existing `QuizDataset` JSON format and creates a paired timeline structure for every question:

```text
Q01 QUESTION  | neutral question and options
Q01 ANSWER    | correct answer highlight, then explanation
Q02 QUESTION
Q02 ANSWER
```

Blue `QUESTION` clips control thinking time. Green `ANSWER` clips control answer/explanation time. Both are transparent lower-overlay Fusion Composition clips designed to sit above talking-head footage, so their edges can be trimmed directly on the Edit timeline.

## Install

Run `install.ps1`, restart DaVinci Resolve, and open:

```text
Workspace > Scripts > Quiz Timeline Builder
```

The installer copies one self-contained Lua file into your per-user Resolve Scripts folder. It does not require Python, packages, or network access.

## Use

1. Open a Resolve project and timeline containing your talking-head video.
2. Place the playhead where the quiz should begin.
3. Open Quiz Timeline Builder from the Workspace menu.
4. Choose a compatible JSON file and set the number of questions.
5. Click **Build Timeline Clips**.
6. Trim each blue question clip and green answer clip to taste.

The builder automatically creates a new top video track named `Quiz Overlays`; it does not ripple or replace the talking-head edit below it. A small `Quiz Builder Assets` Media Pool bin is created to hold the transparent carrier used by Resolve.

Resolve currently creates Fusion compositions using its configured standard generator duration. The builder keeps each pair adjacent and advances from the actual inserted clip length, so the first generated layout is gap-free. Trimming is intentionally left to the editor.

## Supported JSON

The builder directly supports the repository's two question types:

- `mcq`: `question`, `options`, zero-based `correctIndex`, and optional `explanation`.
- `number`: `question`, numeric `target`, optional unit/display fields, and optional `explanation`.

See `sample-quiz.json` and `quiz-timeline.schema.json`.

## Generated behavior

- The answer clip starts with the same neutral question/options state as the end of the question clip.
- At frames 4–12, the correct option highlights while wrong options dim.
- At frames 16–26, the explanation panel and text appear.
- Only the lower overlay renders; the upper half remains transparent for the presenter.
- A glass panel, progress rail, compact question card, and two-column option grid create a modern overlay without external assets.
- Questions, options, numeric answers, and explanations use independent wrap-and-shrink autofit limits.
- The answer state adds an outlined green selection and a dedicated `WHY IT'S RIGHT` panel.
- Timeline markers identify every question and answer boundary.
- Clip colors and names make the paired structure easy to scan.

The visual palette and normalized layout are defined near the middle of `Quiz Timeline Builder.lua` and can later become user-selectable themes.
