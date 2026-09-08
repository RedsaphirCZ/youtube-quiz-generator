import {
  LocalQualityReport,
  MCQQuestion,
  QualityIssue,
  Question,
  QuizDataset,
} from '../types';

const TIME_SENSITIVE_PATTERNS = [
  /\b(?:currently|today|now|as of|present-day|presently)\b/i,
  /\b(?:largest|smallest|highest|lowest|fastest|oldest|youngest|most populous|world record)\b/i,
  /\b(?:president|prime minister|ceo|champion|ranked|population)\b/i,
];

const VAGUE_PATTERNS = [
  /\b(?:generally|usually|often|commonly|widely) considered\b/i,
  /\b(?:roughly|about|approximately|around) how many\b/i,
  /\bmainly known for\b/i,
  /\bwhich of these is associated with\b/i,
];

const GIVEAWAY_OPTIONS = /^(?:all of the above|none of the above|both .+ and .+|obviously|unknown)$/i;
const ANSWER_LABEL_PREFIX = /^(?:fact|fiction|true|false|correct|incorrect|yes|no)\s*[:\-–—]/i;
const BINARY_PROMPT = /^\s*(?:fact\s+or\s+fiction|true\s+or\s+false)\b/i;

const QUESTION_SOFT_MAX_CHARS = 140;
const QUESTION_HARD_MAX_CHARS = 180;
const QUESTION_SOFT_MAX_WORDS = 22;
const QUESTION_HARD_MAX_WORDS = 30;
const OPTION_HARD_MAX_CHARS = 72;
const OPTION_HARD_MAX_WORDS = 12;
const MCQ_SCREEN_HARD_MAX_CHARS = 260;
const MCQ_SCREEN_HARD_MAX_WORDS = 44;

function wordCount(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokens(value: string): Set<string> {
  return new Set(
    normalizeText(value)
      .split(' ')
      .filter((token) => token.length > 2 && !['the', 'and', 'what', 'which', 'who', 'was', 'were', 'this', 'that'].includes(token)),
  );
}

function jaccard(left: Set<string>, right: Set<string>): number {
  if (left.size === 0 || right.size === 0) return 0;
  let intersection = 0;
  for (const token of left) {
    if (right.has(token)) intersection++;
  }
  return intersection / (left.size + right.size - intersection);
}

function normalizedAnswer(question: Question): string {
  if (question.type === 'mcq') return normalizeText(question.options?.[question.correctIndex] || '');
  return `${question.target}:${normalizeText(question.metricUnit || '')}`;
}

function pushIssue(issues: QualityIssue[], issue: QualityIssue): void {
  const existing = issues.find((candidate) => candidate.code === issue.code && candidate.message === issue.message);
  if (existing) {
    existing.questionIndexes = [...new Set([...existing.questionIndexes, ...issue.questionIndexes])].sort((a, b) => a - b);
  } else {
    issues.push(issue);
  }
}

function inspectQuestion(question: Question, questionIndex: number, issues: QualityIssue[]): void {
  const number = questionIndex + 1;
  const questionText = question.question.trim();
  const explanation = question.explanation.trim();

  const questionWords = wordCount(questionText);
  if (questionText.length < 18) {
    pushIssue(issues, {
      code: 'question-too-short',
      severity: 'medium',
      message: `Question ${number} may not provide enough context to be fair.`,
      questionIndexes: [questionIndex],
    });
  } else if (questionText.length > QUESTION_HARD_MAX_CHARS || questionWords > QUESTION_HARD_MAX_WORDS) {
    pushIssue(issues, {
      code: 'question-too-long',
      severity: 'high',
      message: `Question ${number} is too long for spoken and on-screen quiz pacing (${questionText.length} characters, ${questionWords} words).`,
      questionIndexes: [questionIndex],
    });
  } else if (questionText.length > QUESTION_SOFT_MAX_CHARS || questionWords > QUESTION_SOFT_MAX_WORDS) {
    pushIssue(issues, {
      code: 'question-too-long',
      severity: 'medium',
      message: `Question ${number} should be shortened for spoken and on-screen quiz pacing (${questionText.length} characters, ${questionWords} words).`,
      questionIndexes: [questionIndex],
    });
  }

  if (!questionText.endsWith('?')) {
    pushIssue(issues, {
      code: 'missing-question-mark',
      severity: 'low',
      message: `Question ${number} is not punctuated as a question.`,
      questionIndexes: [questionIndex],
    });
  }

  if (explanation.length < 45) {
    pushIssue(issues, {
      code: 'thin-explanation',
      severity: 'medium',
      message: `Question ${number} needs a more useful explanation.`,
      questionIndexes: [questionIndex],
    });
  } else if (explanation.length > 520) {
    pushIssue(issues, {
      code: 'overlong-explanation',
      severity: 'low',
      message: `Question ${number} has an explanation that may be too long for video pacing.`,
      questionIndexes: [questionIndex],
    });
  }

  if (VAGUE_PATTERNS.some((pattern) => pattern.test(questionText))) {
    pushIssue(issues, {
      code: 'ambiguous-wording',
      severity: 'medium',
      message: `Question ${number} uses wording that may allow more than one defensible answer.`,
      questionIndexes: [questionIndex],
    });
  }

  if (question.type === 'mcq') {
    inspectMcq(question, questionIndex, issues);
  } else {
    inspectNumberQuestion(question, questionIndex, issues);
  }
}

function inspectMcq(question: MCQQuestion, questionIndex: number, issues: QualityIssue[]): void {
  const number = questionIndex + 1;
  if (!Array.isArray(question.options) || ![2, 3].includes(question.options.length)) return;

  const lengths = question.options.map((option) => option.trim().length);
  const optionWordCounts = question.options.map(wordCount);
  const correctLength = lengths[question.correctIndex] ?? 0;
  const otherLengths = lengths.filter((_, index) => index !== question.correctIndex);
  const meanOtherLength = otherLengths.reduce((sum, length) => sum + length, 0) / Math.max(1, otherLengths.length);
  if (correctLength > 18 && correctLength > meanOtherLength * 1.8) {
    pushIssue(issues, {
      code: 'answer-length-giveaway',
      severity: 'medium',
      message: `Question ${number}'s correct option is conspicuously longer than its distractors.`,
      questionIndexes: [questionIndex],
    });
  }

  if (question.options.some((option) => GIVEAWAY_OPTIONS.test(option.trim()))) {
    pushIssue(issues, {
      code: 'weak-meta-option',
      severity: 'medium',
      message: `Question ${number} uses an all/none/both-style option instead of a plausible distractor.`,
      questionIndexes: [questionIndex],
    });
  }

  const labelledOptionIndexes = question.options
    .map((option, index) => ANSWER_LABEL_PREFIX.test(option.trim()) ? index : -1)
    .filter((index) => index >= 0);
  if (labelledOptionIndexes.length > 0) {
    pushIssue(issues, {
      code: 'answer-label-in-option',
      severity: 'high',
      message: `Question ${number} puts answer labels such as Fact/Fiction or Correct/Incorrect inside the choices.`,
      questionIndexes: [questionIndex],
    });
  }

  if (BINARY_PROMPT.test(question.question) && question.options.length === 3) {
    pushIssue(issues, {
      code: 'binary-prompt-with-three-options',
      severity: 'high',
      message: `Question ${number} uses a Fact/Fiction or True/False prompt in a three-choice quiz format.`,
      questionIndexes: [questionIndex],
    });
  }

  const overlongOptionIndexes = question.options
    .map((option, index) => option.trim().length > OPTION_HARD_MAX_CHARS || optionWordCounts[index] > OPTION_HARD_MAX_WORDS ? index : -1)
    .filter((index) => index >= 0);
  if (overlongOptionIndexes.length > 0) {
    const labels = overlongOptionIndexes.map((index) => String.fromCharCode(65 + index)).join(', ');
    pushIssue(issues, {
      code: 'option-too-long',
      severity: 'high',
      message: `Question ${number} has overlong answer choices (${labels}); keep each choice under ${OPTION_HARD_MAX_CHARS} characters and ${OPTION_HARD_MAX_WORDS} words.`,
      questionIndexes: [questionIndex],
    });
  }

  const screenCharacters = question.question.trim().length + lengths.reduce((sum, length) => sum + length, 0);
  const screenWords = wordCount(question.question) + optionWordCounts.reduce((sum, count) => sum + count, 0);
  if (screenCharacters > MCQ_SCREEN_HARD_MAX_CHARS || screenWords > MCQ_SCREEN_HARD_MAX_WORDS) {
    pushIssue(issues, {
      code: 'mcq-screen-too-dense',
      severity: 'high',
      message: `Question ${number} is too dense to read comfortably (${screenCharacters} total characters, ${screenWords} words across prompt and choices).`,
      questionIndexes: [questionIndex],
    });
  }

  const normalizedOptions = question.options.map(normalizeText);
  if (normalizedOptions.some((option) => option.length <= 1)) {
    pushIssue(issues, {
      code: 'empty-option',
      severity: 'high',
      message: `Question ${number} contains an empty answer option.`,
      questionIndexes: [questionIndex],
    });
  }

  const questionNormalized = normalizeText(question.question);
  const answerNormalized = normalizedOptions[question.correctIndex];
  if (answerNormalized.length > 4 && questionNormalized.includes(answerNormalized)) {
    pushIssue(issues, {
      code: 'answer-in-question',
      severity: 'high',
      message: `Question ${number} appears to reveal the keyed answer in the prompt.`,
      questionIndexes: [questionIndex],
    });
  }
}

function inspectNumberQuestion(question: Extract<Question, { type: 'number' }>, questionIndex: number, issues: QualityIssue[]): void {
  const number = questionIndex + 1;
  if (!question.metricUnit?.trim()) {
    pushIssue(issues, {
      code: 'missing-number-unit',
      severity: 'high',
      message: `Question ${number} has no unit for its numeric answer.`,
      questionIndexes: [questionIndex],
    });
  }

  if (!Number.isFinite(question.target) || question.target < 0) {
    pushIssue(issues, {
      code: 'implausible-number-target',
      severity: 'high',
      message: `Question ${number} has an invalid or negative numeric target.`,
      questionIndexes: [questionIndex],
    });
  }
}

export function auditQuizQuality(dataset: Pick<QuizDataset, 'questions'>): LocalQualityReport {
  const issues: QualityIssue[] = [];
  const nearDuplicateGroups: number[][] = [];
  const questionTokenSets = dataset.questions.map((question) => tokens(question.question));

  dataset.questions.forEach((question, index) => inspectQuestion(question, index, issues));

  for (let left = 0; left < dataset.questions.length; left++) {
    for (let right = left + 1; right < dataset.questions.length; right++) {
      const similarity = jaccard(questionTokenSets[left], questionTokenSets[right]);
      const sameAnswer = normalizedAnswer(dataset.questions[left]) === normalizedAnswer(dataset.questions[right]);
      if (similarity >= 0.72 || (sameAnswer && similarity >= 0.45)) {
        nearDuplicateGroups.push([left, right]);
      }
    }
  }

  for (const [left, right] of nearDuplicateGroups) {
    pushIssue(issues, {
      code: 'near-duplicate',
      severity: 'medium',
      message: `Questions ${left + 1} and ${right + 1} may test the same fact with very similar wording.`,
      questionIndexes: [left, right],
    });
  }

  const timeSensitiveQuestionIndexes = dataset.questions
    .map((question, index) => ({ question, index }))
    .filter(({ question }) => TIME_SENSITIVE_PATTERNS.some((pattern) => pattern.test(`${question.question} ${question.explanation}`)))
    .map(({ index }) => index);

  for (const questionIndex of timeSensitiveQuestionIndexes) {
    pushIssue(issues, {
      code: 'time-sensitive-fact',
      severity: 'low',
      message: `Question ${questionIndex + 1} contains a fact likely to change and should carry a date or source.`,
      questionIndexes: [questionIndex],
    });
  }

  const penalty = issues.reduce((sum, issue) => {
    const weight = issue.severity === 'high' ? 10 : issue.severity === 'medium' ? 5 : 2;
    return sum + weight;
  }, 0);

  return {
    score: Math.max(0, 100 - penalty),
    issues,
    nearDuplicateGroups,
    timeSensitiveQuestionIndexes,
  };
}
