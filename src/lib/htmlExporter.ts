import { QuizDataset } from '../types';
import { createQuizExportVariant, ExportAnswerChoiceMode } from './exportVariant';

export type QuizExportAppearance = 'classic-light' | 'studio-dark';

export interface ExportPartOptions {
  partNumber?: number; // e.g. 1, 2, or 3
  totalParts?: number; // e.g. 3
  videoTitlePrefix?: string; // e.g. "Video Part 1/3"
  answerChoiceMode?: ExportAnswerChoiceMode;
  appearance?: QuizExportAppearance;
}

/**
 * Generates a self-contained, standalone single-file HTML/CSS/JS document
 * strictly adhering to the Interactive Quiz App Specification & Template.
 * Supports exporting full dataset or sliced video parts (e.g., 3 x 20 questions).
 */
export function generateStandaloneQuizHTML(
  dataset: QuizDataset,
  options?: ExportPartOptions
): string {
  const appearance: QuizExportAppearance = options?.appearance || 'classic-light';
  const exportDataset = createQuizExportVariant(dataset, options?.answerChoiceMode || 'source');
  const jsonQuestions = JSON.stringify(exportDataset.questions, null, 2);
  const baseTitle = (dataset.title || dataset.theme || 'Quiz').replace(/\s*\(Part\s*\d+\s*of\s*\d+[^)]*\)/gi, '').trim();
  const partSuffix = options?.partNumber 
    ? ` • Part ${options.partNumber}/${options.totalParts || 3}`
    : '';
  const themeTitle = escapeHTML(`${baseTitle}${partSuffix}`);
  const totalCount = exportDataset.questions.length;
  const badgeLabel = options?.partNumber 
    ? `Part ${options.partNumber}/${options.totalParts || 3}`
    : `${totalCount} Questions`;
  const colorScheme = appearance === 'studio-dark' ? 'dark' : 'light';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="${colorScheme}">
  <title>${themeTitle} — Interactive Quiz</title>
  <style>
    :root {
      --bg-parchment: #f5f2eb;
      --card-surface: #ffffff;
      --accent-red: #8b1e1e;
      --accent-red-hover: #731818;
      --accent-gold: #c59b27;
      --accent-gold-light: #fef8e7;
      --correct-green: #2e7d32;
      --correct-green-bg: #e8f5e9;
      --incorrect-red: #c62828;
      --incorrect-red-bg: #ffebee;
      --numeric-blue: #185a9d;
      --numeric-blue-bg: #eef6fc;
      --text-main: #2b2520;
      --text-muted: #6b635b;
      --border-subtle: #e0d8cb;
    }

    body[data-theme="studio-dark"] {
      --bg-parchment: #050607;
      --card-surface: #111318;
      --accent-red: #efb84a;
      --accent-red-hover: #ffd479;
      --accent-gold: #efb84a;
      --accent-gold-light: #25200f;
      --correct-green: #53d58a;
      --correct-green-bg: #10271c;
      --incorrect-red: #ff6b78;
      --incorrect-red-bg: #301218;
      --numeric-blue: #75bfff;
      --numeric-blue-bg: #10263a;
      --text-main: #f7f5ef;
      --text-muted: #aaaeb8;
      --border-subtle: #30343d;
      background:
        radial-gradient(circle at 50% -10%, rgba(239, 184, 74, 0.13), transparent 38%),
        linear-gradient(180deg, #090a0d 0%, #030405 100%);
    }

    body[data-theme="studio-dark"] header,
    body[data-theme="studio-dark"] .question-card,
    body[data-theme="studio-dark"] .jump-section,
    body[data-theme="studio-dark"] .summary-card {
      box-shadow: 0 18px 60px rgba(0, 0, 0, 0.48);
    }

    body[data-theme="studio-dark"] .theme-badge {
      color: #ffd479;
    }

    body[data-theme="studio-dark"] .btn-reset:hover,
    body[data-theme="studio-dark"] .nav-btn:hover:not(:disabled) {
      background: #1c1f25;
    }

    body[data-theme="studio-dark"] .progress-track,
    body[data-theme="studio-dark"] .option-marker {
      background: #282c34;
    }

    body[data-theme="studio-dark"] .option-btn,
    body[data-theme="studio-dark"] .num-input,
    body[data-theme="studio-dark"] .metric-card,
    body[data-theme="studio-dark"] .nav-btn,
    body[data-theme="studio-dark"] .jump-btn,
    body[data-theme="studio-dark"] .summary-stat-box {
      background: #17191f;
      color: var(--text-main);
    }

    body[data-theme="studio-dark"] .option-btn:hover:not(:disabled) {
      background: #20232a;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.34);
    }

    body[data-theme="studio-dark"] .explanation-box {
      background: #211d10;
      color: #f4e7bf;
    }

    body[data-theme="studio-dark"] .metric-direction-badge.dir-high {
      background: #35230d;
      color: #ffbd69;
    }

    body[data-theme="studio-dark"] .metric-direction-badge.dir-low {
      background: #10263a;
      color: #75bfff;
    }

    @media (min-width: 900px) and (min-height: 650px) {
      body[data-theme="studio-dark"] .container {
        max-width: 1040px;
        gap: 12px;
      }

      body[data-theme="studio-dark"] .question-card {
        padding: 24px 30px;
      }

      body[data-theme="studio-dark"] .question-text {
        font-size: clamp(1.75rem, 2.35vw, 2.3rem);
        line-height: 1.22;
        margin-bottom: 22px;
      }

      body[data-theme="studio-dark"] .option-btn {
        min-height: 74px;
        padding: 16px 22px;
        font-size: clamp(1.3rem, 1.8vw, 1.65rem);
      }

      body[data-theme="studio-dark"] .option-marker {
        width: 46px;
        height: 46px;
        font-size: 1.25rem;
      }
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    html {
      min-height: 100%;
    }

    body {
      min-height: 100%;
      min-height: 100dvh;
      margin: 0;
      overflow-x: hidden;
      overflow-y: auto;
    }

    body {
      background-color: var(--bg-parchment);
      color: var(--text-main);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      line-height: 1.4;
      padding: max(8px, env(safe-area-inset-top)) max(12px, env(safe-area-inset-right)) max(8px, env(safe-area-inset-bottom)) max(12px, env(safe-area-inset-left));
      box-sizing: border-box;
    }

    .container {
      max-width: 860px;
      margin: 0 auto;
      width: 100%;
      min-height: calc(100vh - 16px);
      min-height: calc(100dvh - 16px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 8px;
      min-height: 0;
    }

    /* Header Banner */
    header {
      flex-shrink: 0;
      background: var(--card-surface);
      border: 2px solid var(--border-subtle);
      border-top: 4px solid var(--accent-red);
      border-radius: 12px;
      padding: 10px 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
    }

    .header-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
    }

    .header-title-group h1 {
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--accent-red);
      letter-spacing: -0.01em;
      margin: 0;
    }

    .theme-badge {
      display: inline-flex;
      align-items: center;
      background: var(--accent-gold-light);
      border: 1px solid var(--accent-gold);
      color: #7c5c0a;
      font-size: 0.78rem;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 6px;
      white-space: nowrap;
    }

    /* Status Bar */
    .status-bar {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px solid var(--border-subtle);
      align-items: center;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .stat-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      font-weight: 700;
    }

    .stat-value {
      font-size: 1rem;
      font-weight: 800;
      color: var(--text-main);
    }

    .btn-reset {
      background: transparent;
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-reset:hover {
      background: #eee8dc;
      color: var(--accent-red);
      border-color: var(--accent-red);
    }

    /* Progress Bar */
    .progress-track {
      width: 100%;
      height: 6px;
      background: #e6dfd1;
      border-radius: 999px;
      overflow: hidden;
      margin-top: 12px;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--accent-gold), var(--accent-red));
      width: 0%;
      transition: width 0.3s ease;
    }

    /* Middle Section Wrapper */
    .middle-section {
      flex: 1 0 auto;
      min-height: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      overflow: visible;
      padding-right: 0;
    }

    /* Main Question Card */
    .question-card {
      background: var(--card-surface);
      border: 2px solid var(--border-subtle);
      border-radius: 14px;
      padding: 16px 20px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
      position: relative;
      width: 100%;
      overflow-wrap: anywhere;
    }

    .card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .question-badge {
      font-size: 0.82rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 4px 10px;
      border-radius: 6px;
    }

    .badge-mcq {
      background: var(--accent-gold-light);
      color: #8c6a0c;
      border: 1px solid rgba(197, 155, 39, 0.5);
    }

    .badge-number {
      background: var(--numeric-blue-bg);
      color: var(--numeric-blue);
      border: 1px solid rgba(24, 90, 157, 0.4);
    }

    .card-counter {
      font-size: 0.95rem;
      font-weight: 800;
      color: var(--accent-red);
    }

    .question-text {
      font-size: 1.45rem;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 16px;
      line-height: 1.3;
      letter-spacing: -0.01em;
    }

    /* MCQ Option List */
    .options-grid {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .option-btn {
      display: flex;
      align-items: center;
      width: 100%;
      text-align: left;
      background: #faf8f4;
      border: 2.5px solid var(--border-subtle);
      border-radius: 12px;
      padding: 12px 18px;
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--text-main);
      cursor: pointer;
      transition: all 0.15s ease;
      gap: 14px;
      touch-action: manipulation;
    }

    .option-btn:hover:not(:disabled) {
      border-color: var(--accent-red);
      background: #ffffff;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .option-marker {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: #e8decb;
      color: var(--text-main);
      font-size: 1.05rem;
      font-weight: 900;
      flex-shrink: 0;
      transition: all 0.2s;
    }

    .option-btn.selected-correct {
      border-color: var(--correct-green);
      background-color: var(--correct-green-bg);
      color: #1b5e20;
    }
    .option-btn.selected-correct .option-marker {
      background-color: var(--correct-green);
      color: #fff;
    }

    .option-btn.selected-incorrect {
      border-color: var(--incorrect-red);
      background-color: var(--incorrect-red-bg);
      color: #b71c1c;
    }
    .option-btn.selected-incorrect .option-marker {
      background-color: var(--incorrect-red);
      color: #fff;
    }

    .option-btn.reveal-correct {
      border-color: var(--correct-green);
      background-color: var(--correct-green-bg);
      color: #1b5e20;
      border-style: dashed;
    }
    .option-btn.reveal-correct .option-marker {
      background-color: var(--correct-green);
      color: #fff;
    }

    .option-btn:disabled {
      cursor: default;
    }

    /* Number Guess Input View */
    .number-input-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .input-row {
      display: flex;
      gap: 12px;
      align-items: center;
      flex-wrap: wrap;
    }

    .input-wrapper {
      display: flex;
      align-items: center;
      border: 1.5px solid var(--border-subtle);
      border-radius: 8px;
      background: #fff;
      padding: 4px 12px;
      flex: 1;
      min-width: 200px;
    }

    .input-wrapper:focus-within {
      border-color: var(--numeric-blue);
      box-shadow: 0 0 0 3px rgba(24, 90, 157, 0.15);
    }

    .num-input {
      border: none;
      outline: none;
      font-size: 1.15rem;
      font-weight: 600;
      width: 100%;
      color: var(--text-main);
      padding: 8px 4px;
    }

    .unit-label {
      color: var(--text-muted);
      font-size: 0.9rem;
      font-weight: 600;
      padding-left: 8px;
    }

    .btn-check {
      background: var(--numeric-blue);
      color: #fff;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
      white-space: nowrap;
    }

    .btn-check:hover:not(:disabled) {
      background: #124479;
    }

    .btn-check:disabled {
      opacity: 0.6;
      cursor: default;
    }

    /* Numeric Comparison Metrics */
    .metrics-box {
      margin-top: 20px;
      background: var(--numeric-blue-bg);
      border: 1px solid rgba(24, 90, 157, 0.25);
      border-radius: 10px;
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 12px;
    }

    .metric-card {
      background: #fff;
      padding: 10px 14px;
      border-radius: 6px;
      border: 1px solid rgba(24, 90, 157, 0.15);
    }

    .metric-title {
      font-size: 0.72rem;
      color: var(--text-muted);
      text-transform: uppercase;
      font-weight: 700;
      margin-bottom: 2px;
    }

    .metric-data {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--numeric-blue);
    }

    .metric-direction-badge {
      display: inline-block;
      font-size: 0.78rem;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 4px;
    }
    .dir-exact { background: var(--correct-green-bg); color: var(--correct-green); }
    .dir-high { background: #fff3e0; color: #e65100; }
    .dir-low { background: #e1f5fe; color: #0277bd; }

    /* Explanation Box */
    .explanation-box {
      margin-top: 20px;
      padding: 16px 18px;
      border-radius: 8px;
      background: #faf8f5;
      border-left: 4px solid var(--accent-gold);
      font-size: 0.95rem;
      color: var(--text-main);
      line-height: 1.5;
    }

    .explanation-box strong {
      color: var(--accent-red);
    }

    /* Navigation Controls */
    .nav-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      margin-top: 10px;
    }

    .nav-btn {
      background: var(--card-surface);
      border: 2px solid var(--border-subtle);
      color: var(--text-main);
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
    }

    .nav-btn:hover:not(:disabled) {
      border-color: var(--accent-red);
      color: var(--accent-red);
      background: #faf7f0;
    }

    .nav-btn:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .nav-btn-primary {
      background: var(--accent-red);
      color: #fff;
      border-color: var(--accent-red);
    }

    .nav-btn-primary:hover:not(:disabled) {
      background: var(--accent-red-hover);
      color: #fff;
    }

    /* Jump Grid */
    .jump-section {
      flex-shrink: 0;
      background: var(--card-surface);
      border: 2px solid var(--border-subtle);
      border-radius: 12px;
      padding: 8px 12px;
    }

    .jump-header {
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 800;
      color: var(--text-muted);
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
    }

    .jump-legend {
      display: flex;
      gap: 8px;
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: none;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .legend-dot {
      width: 9px;
      height: 9px;
      border-radius: 2px;
    }

    .jump-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
      gap: 4px;
    }

    .jump-btn {
      width: 100%;
      height: 24px;
      border-radius: 5px;
      font-size: 0.76rem;
      font-weight: 800;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border-subtle);
      background: #fbf9f4;
      color: var(--text-muted);
      transition: all 0.15s;
      touch-action: manipulation;
    }

    .jump-btn:hover {
      border-color: var(--accent-gold);
      transform: scale(1.05);
    }

    .jump-btn.state-current {
      outline: 2.5px solid var(--accent-red);
      outline-offset: 1px;
      font-weight: 800;
    }

    .jump-btn.state-correct {
      background: var(--correct-green);
      color: #ffffff;
      border-color: var(--correct-green);
    }

    .jump-btn.state-incorrect {
      background: var(--incorrect-red);
      color: #ffffff;
      border-color: var(--incorrect-red);
    }

    .jump-btn.state-number-checked {
      background: var(--numeric-blue);
      color: #ffffff;
      border-color: var(--numeric-blue);
    }

    /* Summary Screen */
    .summary-card {
      display: none;
      background: var(--card-surface);
      border: 1px solid var(--border-subtle);
      border-top: 4px solid var(--accent-gold);
      border-radius: 12px;
      padding: 36px 28px;
      text-align: center;
      box-shadow: 0 8px 24px rgba(0,0,0,0.06);
    }

    .summary-title {
      font-size: 1.8rem;
      color: var(--accent-red);
      font-weight: 700;
      margin-bottom: 8px;
    }

    .summary-subtitle {
      color: var(--text-muted);
      font-size: 1rem;
      margin-bottom: 24px;
    }

    .summary-metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
      max-width: 600px;
      margin: 0 auto 32px auto;
    }

    .summary-stat-box {
      background: #faf8f4;
      border: 1px solid var(--border-subtle);
      border-radius: 10px;
      padding: 16px;
    }

    .summary-stat-val {
      font-size: 2rem;
      font-weight: 800;
      color: var(--accent-red);
    }

    .summary-stat-lbl {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      margin-top: 4px;
    }

    .btn-restart {
      background: var(--accent-red);
      color: #fff;
      border: none;
      padding: 14px 32px;
      border-radius: 8px;
      font-size: 1.05rem;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-restart:hover {
      background: var(--accent-red-hover);
    }

    /* Responsive layout: use one natural page scroll, never a nested middle scroller. */
    @media (max-width: 1024px) {
      .nav-btn,
      .btn-reset,
      .btn-check,
      .btn-restart {
        min-height: 44px;
        touch-action: manipulation;
      }

      .jump-grid {
        grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
        gap: 5px;
      }

      .jump-btn {
        height: 40px;
      }
    }

    @media (max-width: 720px) {
      body {
        padding: max(6px, env(safe-area-inset-top)) max(8px, env(safe-area-inset-right)) max(6px, env(safe-area-inset-bottom)) max(8px, env(safe-area-inset-left));
      }

      .container {
        min-height: calc(100vh - 12px);
        min-height: calc(100dvh - 12px);
        gap: 6px;
      }

      header {
        padding: 8px 10px;
        border-radius: 10px;
      }

      .header-top {
        align-items: flex-start;
      }

      .header-title-group {
        min-width: 0;
      }

      .header-title-group h1 {
        font-size: clamp(1rem, 4.8vw, 1.2rem);
        line-height: 1.25;
        overflow-wrap: anywhere;
      }

      .theme-badge {
        flex-shrink: 0;
        font-size: 0.7rem;
        padding: 3px 6px;
      }

      .status-bar {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 6px;
        margin-top: 8px;
        padding-top: 8px;
      }

      .stat-item {
        min-width: 0;
        flex-direction: column;
        align-items: flex-start;
        gap: 0;
      }

      .stat-label {
        max-width: 100%;
        font-size: 0.6rem;
        letter-spacing: 0.025em;
        white-space: nowrap;
      }

      .stat-value {
        font-size: 0.86rem;
        white-space: nowrap;
      }

      .btn-reset {
        min-height: 40px;
        width: 100%;
        padding: 4px;
        font-size: 0.7rem;
        touch-action: manipulation;
      }

      .progress-track {
        margin-top: 8px;
      }

      .middle-section {
        min-height: auto;
        justify-content: flex-start;
      }

      .question-card {
        padding: 12px clamp(12px, 4vw, 18px);
        border-radius: 12px;
      }

      .card-meta {
        margin-bottom: 10px;
        padding-bottom: 7px;
      }

      .question-badge {
        font-size: 0.72rem;
        padding: 4px 7px;
      }

      .card-counter {
        font-size: 0.82rem;
      }

      .question-text {
        font-size: clamp(1.1rem, 5vw, 1.35rem);
        margin-bottom: 12px;
        line-height: 1.3;
      }

      .options-grid {
        gap: 8px;
      }

      .option-btn {
        min-height: 52px;
        padding: 10px 12px;
        gap: 10px;
        border-width: 2px;
        border-radius: 10px;
        font-size: clamp(1rem, 4.2vw, 1.12rem);
        line-height: 1.3;
      }

      .option-marker {
        width: 34px;
        height: 34px;
        font-size: 0.95rem;
      }

      .input-wrapper {
        min-width: 0;
      }

      .num-input {
        font-size: 1rem;
      }

      .metrics-box,
      .explanation-box {
        margin-top: 12px;
        padding: 12px;
      }

      #nav-controls {
        margin-top: 10px !important;
        padding-top: 8px !important;
      }

      .nav-btn {
        min-height: 44px;
        flex: 1;
        padding: 9px 12px;
        touch-action: manipulation;
      }

      .jump-section {
        padding: 8px 10px;
        border-radius: 10px;
      }

      .jump-grid {
        grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
        gap: 5px;
      }

      .jump-btn {
        height: 40px;
        font-size: 0.78rem;
      }

      .summary-card {
        padding: 24px 14px;
      }

      .summary-metrics-grid {
        grid-template-columns: 1fr;
        gap: 10px;
        margin-bottom: 20px;
      }
    }

    @media (max-width: 480px) {
      .jump-header {
        align-items: flex-start;
        flex-direction: column;
      }

      .jump-grid {
        grid-template-columns: repeat(6, minmax(0, 1fr));
      }

      .input-row {
        align-items: stretch;
        flex-direction: column;
      }

      .input-wrapper,
      .btn-check {
        width: 100%;
      }

      .btn-check {
        min-height: 44px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        scroll-behavior: auto !important;
        transition-duration: 0.01ms !important;
      }
    }
    /* Content leads: generous type, quiet chrome, and natural page scrolling. */
    .container, body[data-theme="studio-dark"] .container { max-width: 1200px; gap: 16px; }
    .question-card, body[data-theme="studio-dark"] .question-card { padding: clamp(18px, 3vw, 36px); border-radius: 20px; }
    .question-text, body[data-theme="studio-dark"] .question-text {
      font-size: clamp(1.65rem, 3.5vw, 3.5rem); line-height: 1.18; letter-spacing: -0.025em;
      margin-bottom: 28px; overflow-wrap: anywhere;
    }
    .option-btn, body[data-theme="studio-dark"] .option-btn {
      font-size: clamp(1.25rem, 2.5vw, 2.5rem); min-height: 76px; padding: 18px 20px;
      line-height: 1.25; overflow-wrap: anywhere; border-radius: 14px;
    }
    .explanation-box { font-size: clamp(1.1rem, 1.8vw, 1.65rem); line-height: 1.5; }
    /* A fixed responsive stage prevents the recording frame from jumping when
       question length or the answer explanation changes. Type follows the
       viewport; exceptional content scrolls inside the unchanged card. */
    .container, body[data-theme="studio-dark"] .container {
      min-height: calc(100dvh - 16px);
    }
    .middle-section, body[data-theme="studio-dark"] .middle-section {
      flex: 0 0 auto;
      height: clamp(34rem, 64dvh, 47.5rem);
      min-height: clamp(34rem, 64dvh, 47.5rem);
      overflow: hidden;
    }
    .question-card, body[data-theme="studio-dark"] .question-card,
    .summary-card, body[data-theme="studio-dark"] .summary-card {
      width: 100%;
      height: 100%;
      min-height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      scrollbar-gutter: stable;
    }
    .question-text, body[data-theme="studio-dark"] .question-text {
      font-size: clamp(1.55rem, min(3vw, 3.6dvh), 2.5rem);
    }
    .option-btn, body[data-theme="studio-dark"] .option-btn {
      font-size: clamp(1.1rem, min(2.15vw, 2.6dvh), 1.7rem);
    }
    .explanation-box, body[data-theme="studio-dark"] .explanation-box {
      font-size: clamp(0.95rem, min(1.5vw, 1.9dvh), 1.2rem);
    }
    @media (max-width: 720px) {
      .middle-section, body[data-theme="studio-dark"] .middle-section {
        height: clamp(31rem, 68dvh, 38rem);
        min-height: clamp(31rem, 68dvh, 38rem);
      }
    }
    @media (max-width: 480px) {
      .option-btn, body[data-theme="studio-dark"] .option-btn { padding: 14px 12px; gap: 12px; }
    }
  </style>
</head>
<body data-theme="${appearance}">
  <div class="container">
    <!-- Header -->
    <header>
      <div class="header-top">
        <div class="header-title-group">
          <h1>${themeTitle}</h1>
        </div>
        <span class="theme-badge">${badgeLabel}</span>
      </div>

      <div class="status-bar">
        <div class="stat-item">
          <span class="stat-label">Question</span>
          <span class="stat-value" id="disp-curr-q">1 / ${totalCount}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">MCQ Score</span>
          <span class="stat-value" id="disp-mcq-score">0 / 0</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Completed</span>
          <span class="stat-value" id="disp-completed">0 / ${totalCount}</span>
        </div>
        <button class="btn-reset" id="btn-reset-quiz">Reset Quiz</button>
      </div>

      <div class="progress-track">
        <div class="progress-fill" id="progress-bar"></div>
      </div>
    </header>

    <!-- Middle Section: Only this area adjusts while header and navigator stay locked -->
    <div class="middle-section">
      <!-- Interactive Question Card -->
      <main class="question-card" id="main-question-card">
        <div class="card-meta">
          <span class="question-badge badge-mcq" id="card-badge">Multiple Choice</span>
          <span class="card-counter" id="card-counter">Question 1 of ${totalCount}</span>
        </div>

        <h2 class="question-text" id="card-question-text">Loading question...</h2>

        <!-- MCQ View -->
        <div class="options-grid" id="mcq-options-container">
          <!-- Rendered by JS -->
        </div>

        <!-- Number View -->
        <div class="number-input-form" id="number-input-container" style="display: none;">
          <div class="input-row">
            <div class="input-wrapper">
              <input type="number" id="num-guess-input" class="num-input" placeholder="Enter estimated number" step="any" />
              <span class="unit-label" id="unit-label"></span>
            </div>
            <button class="btn-check" id="btn-check-number">Check Estimate</button>
          </div>

          <div class="metrics-box" id="num-metrics-box" style="display: none;">
            <div class="metrics-grid">
              <div class="metric-card">
                <div class="metric-title">Target Value</div>
                <div class="metric-data" id="m-target">-</div>
              </div>
              <div class="metric-card">
                <div class="metric-title">Your Guess</div>
                <div class="metric-data" id="m-guess">-</div>
              </div>
              <div class="metric-card">
                <div class="metric-title">Off By</div>
                <div class="metric-data" id="m-diff">-</div>
              </div>
              <div class="metric-card">
                <div class="metric-title">Closer Span</div>
                <div class="metric-data" id="m-span">-</div>
              </div>
            </div>
            <div>
              <span class="metric-direction-badge" id="m-dir-badge">Direction</span>
            </div>
          </div>
        </div>

        <!-- Explanation -->
        <div class="explanation-box" id="explanation-box" style="display: none;">
          <strong>Fact & Context:</strong> <span id="explanation-text"></span>
        </div>

        <!-- Navigation Controls inside Card -->
        <div class="nav-bar" id="nav-controls" style="margin-top: 14px; padding-top: 10px; border-top: 1px solid var(--border-subtle);">
          <button class="nav-btn" id="btn-prev">Previous</button>
          <button class="nav-btn nav-btn-primary" id="btn-next">Next</button>
        </div>
      </main>

      <!-- Summary Screen -->
      <section class="summary-card" id="summary-card" style="display: none;">
        <h2 class="summary-title">Quiz Completed!</h2>
        <p class="summary-subtitle">${themeTitle} Knowledge Assessment</p>

        <div class="summary-metrics-grid">
          <div class="summary-stat-box">
            <div class="summary-stat-val" id="sum-score">0 / 0</div>
            <div class="summary-stat-lbl">MCQ Score</div>
          </div>
          <div class="summary-stat-box">
            <div class="summary-stat-val" id="sum-accuracy">0%</div>
            <div class="summary-stat-lbl">Accuracy</div>
          </div>
          <div class="summary-stat-box">
            <div class="summary-stat-val" id="sum-completed">0 / ${totalCount}</div>
            <div class="summary-stat-lbl">Questions Checked</div>
          </div>
        </div>

        <button class="btn-restart" id="btn-restart-quiz">Restart Quiz</button>
      </section>
    </div>

    <!-- 1-60 Jump Grid (Locked at bottom) -->
    <section class="jump-section">
      <div class="jump-header">
        <span>Question Quick Jump (1–${totalCount})</span>
        <div class="jump-legend">
          <div class="legend-item"><div class="legend-dot" style="background:#2e7d32"></div> Correct</div>
          <div class="legend-item"><div class="legend-dot" style="background:#c62828"></div> Incorrect</div>
          <div class="legend-item"><div class="legend-dot" style="background:#185a9d"></div> Estimate</div>
        </div>
      </div>
      <div class="jump-grid" id="jump-grid">
        <!-- Rendered by JS -->
      </div>
    </section>

  </div>

  <script>
    const questions = ${jsonQuestions};
    const totalCount = questions.length;
    let currentIndex = 0;
    const userAnswers = {};

    // DOM Elements
    const dispCurrQ = document.getElementById('disp-curr-q');
    const dispScore = document.getElementById('disp-mcq-score');
    const dispCompleted = document.getElementById('disp-completed');
    const progressBar = document.getElementById('progress-bar');
    const jumpGrid = document.getElementById('jump-grid');
    const cardBadge = document.getElementById('card-badge');
    const cardCounter = document.getElementById('card-counter');
    const cardQuestionText = document.getElementById('card-question-text');
    const mcqContainer = document.getElementById('mcq-options-container');
    const numContainer = document.getElementById('number-input-container');
    const numInput = document.getElementById('num-guess-input');
    const unitLabel = document.getElementById('unit-label');
    const btnCheckNum = document.getElementById('btn-check-number');
    const numMetricsBox = document.getElementById('num-metrics-box');
    const mTarget = document.getElementById('m-target');
    const mGuess = document.getElementById('m-guess');
    const mDiff = document.getElementById('m-diff');
    const mSpan = document.getElementById('m-span');
    const mDirBadge = document.getElementById('m-dir-badge');
    const explanationBox = document.getElementById('explanation-box');
    const explanationText = document.getElementById('explanation-text');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const mainQuestionCard = document.getElementById('main-question-card');
    const summaryCard = document.getElementById('summary-card');
    const navControls = document.getElementById('nav-controls');
    const btnReset = document.getElementById('btn-reset-quiz');
    const btnRestart = document.getElementById('btn-restart-quiz');
    const middleSection = document.querySelector('.middle-section');

    function init() {
      createJumpGrid();
      renderQuestion(0);
      updateStatusBar();
      setupEventListeners();
    }

    function createJumpGrid() {
      jumpGrid.innerHTML = '';
      for (let i = 0; i < totalCount; i++) {
        const btn = document.createElement('button');
        btn.className = 'jump-btn';
        btn.textContent = (i + 1);
        btn.id = 'jump-btn-' + i;
        btn.addEventListener('click', () => {
          showQuestionView();
          renderQuestion(i, true);
        });
        jumpGrid.appendChild(btn);
      }
    }

    function renderQuestion(index, moveIntoView = false) {
      currentIndex = index;
      const q = questions[index];
      const ans = userAnswers[index];

      // Update counters
      dispCurrQ.textContent = (index + 1) + ' / ' + totalCount;
      cardCounter.textContent = 'Question ' + (index + 1) + ' of ' + totalCount;
      cardQuestionText.textContent = q.question;

      // Update Nav Buttons
      btnPrev.disabled = index === 0;
      if (index === totalCount - 1) {
        btnNext.textContent = 'Finish & Summary';
      } else {
        btnNext.textContent = 'Next';
      }

      // Reset dynamic containers
      explanationBox.style.display = 'none';
      explanationText.textContent = '';

      if (q.type === 'mcq') {
        cardBadge.className = 'question-badge badge-mcq';
        cardBadge.textContent = 'Multiple Choice';
        mcqContainer.style.display = 'flex';
        numContainer.style.display = 'none';
        renderMCQOptions(q, ans);
      } else {
        cardBadge.className = 'question-badge badge-number';
        cardBadge.textContent = 'Guess the Number';
        mcqContainer.style.display = 'none';
        numContainer.style.display = 'flex';
        renderNumberQuestion(q, ans);
      }

      updateJumpGridStyles();
      updateStatusBar();

      if (moveIntoView) {
        requestAnimationFrame(() => middleSection.scrollIntoView({ block: 'start', behavior: 'auto' }));
      }
    }

    function renderMCQOptions(q, ans) {
      mcqContainer.innerHTML = '';
      const letters = ['A', 'B', 'C'];

      q.options.forEach((optText, optIdx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.id = 'opt-btn-' + optIdx;

        const marker = document.createElement('span');
        marker.className = 'option-marker';
        marker.textContent = letters[optIdx];

        const textSpan = document.createElement('span');
        textSpan.textContent = optText;

        btn.appendChild(marker);
        btn.appendChild(textSpan);

        if (ans !== undefined) {
          btn.disabled = true;
          if (optIdx === q.correctIndex) {
            btn.classList.add('selected-correct');
          } else if (optIdx === ans.selectedOption) {
            btn.classList.add('selected-incorrect');
          }
        } else {
          btn.addEventListener('click', () => handleMCQAnswer(optIdx));
        }

        mcqContainer.appendChild(btn);
      });

      if (ans !== undefined) {
        showExplanation(q.explanation);
      }
    }

    function handleMCQAnswer(selectedIdx) {
      const q = questions[currentIndex];
      const isCorrect = selectedIdx === q.correctIndex;
      userAnswers[currentIndex] = {
        selectedOption: selectedIdx,
        isCorrect: isCorrect,
        isChecked: true
      };

      renderMCQOptions(q, userAnswers[currentIndex]);
      updateStatusBar();
      updateJumpGridStyles();
    }

    function renderNumberQuestion(q, ans) {
      unitLabel.textContent = q.metricUnit || '';
      numInput.value = '';
      numMetricsBox.style.display = 'none';

      if (ans !== undefined) {
        numInput.value = ans.guess;
        numInput.disabled = true;
        btnCheckNum.disabled = true;
        displayNumberMetrics(q, ans.guess);
        showExplanation(q.explanation);
      } else {
        numInput.disabled = false;
        btnCheckNum.disabled = false;
      }
    }

    function handleNumberCheck() {
      const val = parseFloat(numInput.value);
      if (isNaN(val)) return;

      const q = questions[currentIndex];
      userAnswers[currentIndex] = {
        guess: val,
        isChecked: true
      };

      numInput.disabled = true;
      btnCheckNum.disabled = true;
      displayNumberMetrics(q, val);
      showExplanation(q.explanation);
      updateStatusBar();
      updateJumpGridStyles();
    }

    function displayNumberMetrics(q, guess) {
      const target = q.target;
      const diff = Math.abs(guess - target);
      const spanLow = target - diff;
      const spanHigh = target + diff;
      const unit = q.metricUnit ? ' ' + q.metricUnit : '';
      const imp = q.imperialDisplay ? ' [' + q.imperialDisplay + ']' : '';

      mTarget.textContent = target + unit + imp;
      mGuess.textContent = guess + unit;
      mDiff.textContent = diff.toLocaleString() + unit;
      mSpan.textContent = '[' + spanLow.toLocaleString() + ' to ' + spanHigh.toLocaleString() + ']';

      mDirBadge.className = 'metric-direction-badge';
      if (guess === target) {
        mDirBadge.classList.add('dir-exact');
        mDirBadge.textContent = 'Exact Match!';
      } else if (guess > target) {
        mDirBadge.classList.add('dir-high');
        mDirBadge.textContent = 'Higher than target';
      } else {
        mDirBadge.classList.add('dir-low');
        mDirBadge.textContent = 'Lower than target';
      }

      numMetricsBox.style.display = 'flex';
    }

    function showExplanation(text) {
      if (!text) return;
      explanationText.textContent = text;
      explanationBox.style.display = 'block';
    }

    function updateStatusBar() {
      let mcqAnswered = 0;
      let mcqCorrect = 0;
      let completedCount = 0;

      for (let i = 0; i < totalCount; i++) {
        const a = userAnswers[i];
        if (a && a.isChecked) {
          completedCount++;
          if (questions[i].type === 'mcq') {
            mcqAnswered++;
            if (a.isCorrect) mcqCorrect++;
          }
        }
      }

      dispScore.textContent = mcqCorrect + ' / ' + mcqAnswered;
      dispCompleted.textContent = completedCount + ' / ' + totalCount;
      const pct = (completedCount / totalCount) * 100;
      progressBar.style.width = pct + '%';
    }

    function updateJumpGridStyles() {
      for (let i = 0; i < totalCount; i++) {
        const btn = document.getElementById('jump-btn-' + i);
        if (!btn) continue;

        btn.className = 'jump-btn';
        if (i === currentIndex) {
          btn.classList.add('state-current');
        }

        const ans = userAnswers[i];
        if (ans && ans.isChecked) {
          if (questions[i].type === 'mcq') {
            if (ans.isCorrect) {
              btn.classList.add('state-correct');
            } else {
              btn.classList.add('state-incorrect');
            }
          } else {
            btn.classList.add('state-number-checked');
          }
        }
      }
    }

    function showSummary() {
      mainQuestionCard.style.display = 'none';
      navControls.style.display = 'none';
      summaryCard.style.display = 'block';

      let mcqAnswered = 0;
      let mcqCorrect = 0;
      let completedCount = 0;

      for (let i = 0; i < totalCount; i++) {
        const a = userAnswers[i];
        if (a && a.isChecked) {
          completedCount++;
          if (questions[i].type === 'mcq') {
            mcqAnswered++;
            if (a.isCorrect) mcqCorrect++;
          }
        }
      }

      document.getElementById('sum-score').textContent = mcqCorrect + ' / ' + mcqAnswered;
      const acc = mcqAnswered > 0 ? Math.round((mcqCorrect / mcqAnswered) * 100) : 0;
      document.getElementById('sum-accuracy').textContent = acc + '%';
      document.getElementById('sum-completed').textContent = completedCount + ' / ' + totalCount;
    }

    function showQuestionView() {
      mainQuestionCard.style.display = 'block';
      navControls.style.display = 'flex';
      summaryCard.style.display = 'none';
    }

    function setupEventListeners() {
      btnPrev.addEventListener('click', () => {
        if (currentIndex > 0) renderQuestion(currentIndex - 1, true);
      });

      btnNext.addEventListener('click', () => {
        if (currentIndex === totalCount - 1) {
          showSummary();
        } else {
          renderQuestion(currentIndex + 1, true);
        }
      });

      btnCheckNum.addEventListener('click', handleNumberCheck);
      numInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleNumberCheck();
      });

      btnReset.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all answers and return to Question 1?')) {
          for (let k in userAnswers) delete userAnswers[k];
          showQuestionView();
          renderQuestion(0, true);
        }
      });

      btnRestart.addEventListener('click', () => {
        for (let k in userAnswers) delete userAnswers[k];
        showQuestionView();
        renderQuestion(0, true);
      });
    }

    init();
  </script>
</body>
</html>`;
}

function escapeHTML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export interface VideoQuizPart {
  partNumber: number;
  totalParts: number;
  startIndex: number;
  endIndex: number;
  questionCount: number;
  title: string;
  filename: string;
  dataset: QuizDataset;
  htmlContent: string;
}

/**
 * Splits a quiz into a requested number of balanced standalone HTML parts.
 * Any remainder is assigned one question at a time to the earliest parts.
 */
export function splitQuizIntoVideoParts(
  fullQuiz: QuizDataset, 
  requestedParts: number = 3,
  exportOptions: Pick<ExportPartOptions, 'answerChoiceMode' | 'appearance'> = {}
): VideoQuizPart[] {
  const total = fullQuiz.questions.length;
  const partsCount = Math.min(Math.max(1, Math.round(requestedParts) || 1), Math.max(1, total));
  const result: VideoQuizPart[] = [];
  const baseThemeSlug = (fullQuiz.theme || fullQuiz.title || 'quiz')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');

  const basePartSize = Math.floor(total / partsCount);
  const remainder = total % partsCount;
  let start = 0;

  for (let i = 0; i < partsCount; i++) {
    const partSize = basePartSize + (i < remainder ? 1 : 0);
    const end = start + partSize;
    const slicedQuestions = fullQuiz.questions.slice(start, end);
    const partNum = i + 1;

    const partDataset: QuizDataset = {
      ...fullQuiz,
      id: partsCount === 1 ? fullQuiz.id : `${fullQuiz.id}-part-${partNum}`,
      title: partsCount === 1
        ? fullQuiz.title
        : `${fullQuiz.title || fullQuiz.theme} (Part ${partNum} of ${partsCount} • Video Episode)`,
      description: partsCount === 1
        ? fullQuiz.description
        : `Video Episode ${partNum}: Questions ${start + 1} to ${end}. ${fullQuiz.description || ''}`,
      questions: slicedQuestions,
    };

    const exportedPartDataset = createQuizExportVariant(partDataset, exportOptions.answerChoiceMode || 'source');
    const htmlContent = generateStandaloneQuizHTML(partDataset, {
      ...exportOptions,
      ...(partsCount === 1 ? {} : {
        partNumber: partNum,
        totalParts: partsCount,
        videoTitlePrefix: `Video Part ${partNum}/${partsCount}`,
      }),
    });

    const choiceSuffix = exportOptions.answerChoiceMode === 2 ? '-2-choice' : '';
    const styleSuffix = exportOptions.appearance === 'studio-dark' ? '-studio-black' : '';
    const filename = partsCount === 1
      ? `${baseThemeSlug}-full-${total}q${choiceSuffix}${styleSuffix}.html`
      : `${baseThemeSlug}-part-${partNum}-of-${partsCount}-questions-${start + 1}-to-${end}${choiceSuffix}${styleSuffix}.html`;

    result.push({
      partNumber: partNum,
      totalParts: partsCount,
      startIndex: start,
      endIndex: end - 1,
      questionCount: slicedQuestions.length,
      title: partDataset.title,
      filename,
      dataset: exportedPartDataset,
      htmlContent,
    });
    start = end;
  }

  return result;
}
