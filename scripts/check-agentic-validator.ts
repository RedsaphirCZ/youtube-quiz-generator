import { strict as assert } from 'node:assert';
import { buildAgentValidationReport, EditorialFinding, EvidenceFinding } from '../src/lib/agentVerdict';
import { auditQuizQuality } from '../src/lib/qualityValidator';
import { sanitizeQuestions, validateQuizDataset } from '../src/lib/validator';
import { QualityScores, QuizDataset } from '../src/types';

const scores: QualityScores = {
  factuality: 4,
  clarity: 4,
  fairness: 4,
  distractors: 4,
  explanation: 4,
  value: 4,
};

const quiz: QuizDataset = {
  id: 'agent-validator-fixture',
  theme: 'Validator fixture',
  title: 'Agent Validator Fixture',
  description: 'A small deterministic fixture for validator checks.',
  difficulty: 'moderate',
  createdAt: '2026-08-30T00:00:00.000Z',
  questions: [
    {
      type: 'mcq',
      question: 'Which city is currently the capital of France?',
      options: ['Paris', 'A dramatically overlong distractor intended to reveal the shorter answer', 'Lyon'],
      correctIndex: 0,
      explanation: 'Paris is the capital and largest city of France, serving as the seat of the national government.',
    },
    {
      type: 'mcq',
      question: 'Which city serves as the capital of France today?',
      options: ['Marseille', 'Paris', 'Toulouse'],
      correctIndex: 1,
      explanation: 'Paris is France’s capital, and the principal institutions of the French national government are based there.',
    },
    {
      type: 'mcq',
      question: 'Which planet is known for its prominent ring system?',
      options: ['Mars', 'Venus', 'Saturn'],
      correctIndex: 2,
      explanation: 'Saturn has the Solar System’s most extensive visible ring system, composed mainly of ice particles and rock.',
    },
    {
      type: 'mcq',
      question: 'Which element has the chemical symbol Au?',
      options: ['Gold', 'Silver', 'Copper'],
      correctIndex: 0,
      explanation: 'Au is the chemical symbol for gold and derives from the Latin word aurum.',
    },
    {
      type: 'mcq',
      question: 'Who wrote the novel Frankenstein?',
      options: ['Jane Austen', 'Mary Shelley', 'George Eliot'],
      correctIndex: 1,
      explanation: 'Mary Shelley published Frankenstein anonymously in 1818, with her name appearing on a later edition.',
    },
    {
      type: 'number',
      question: 'How many bones are typically present in the adult human skeleton?',
      target: 206,
      metricUnit: 'bones',
      explanation: 'The standard adult anatomical count is 206 bones, although normal variation and counting conventions can change the total.',
    },
  ],
};

const structuralReport = validateQuizDataset(quiz.questions, 1);
assert.equal(structuralReport.isValid, true, 'Fixture should pass deterministic structure checks.');

const relaxedQuiz: QuizDataset = {
  ...quiz,
  id: 'relaxed-two-choice-fixture',
  answerChoiceCount: 2,
  questions: [
    ...quiz.questions.slice(0, 5).map((question, index) => question.type === 'mcq' ? {
      ...question,
      options: [question.options[0], question.options[1]] as [string, string],
      correctIndex: (index % 2) as 0 | 1,
    } : question),
    quiz.questions[5],
  ],
};
const relaxedStructuralReport = validateQuizDataset(relaxedQuiz.questions, 1);
assert.equal(relaxedStructuralReport.isValid, true, 'Two-choice MCQs should pass deterministic structure checks.');
const sanitizedRelaxedQuestions = sanitizeQuestions(quiz.questions, 2);
assert.equal(sanitizedRelaxedQuestions[0].type === 'mcq' ? sanitizedRelaxedQuestions[0].options.length : 0, 2, 'Two-choice generation must stay at two options after sanitizing.');

const localReport = auditQuizQuality(quiz);
assert(localReport.timeSensitiveQuestionIndexes.includes(0), 'Changing-fact wording should be flagged.');
assert(localReport.nearDuplicateGroups.some((group) => group.includes(0) && group.includes(1)), 'Near duplicates should be detected.');

const badPlayabilityReport = auditQuizQuality({
  questions: [{
    type: 'mcq',
    question: 'Fact or Fiction: Fossil evidence shows that Velociraptor had large, vaned feathers attached to its forearm?',
    options: [
      'Fact: quill knobs on a Velociraptor ulna show where large feathers attached',
      'Fiction: every dromaeosaur had only reptile-like scales',
      'Fiction: feathers first appeared after non-avian dinosaurs died out',
    ],
    correctIndex: 0,
    explanation: 'Quill knobs on a fossilized forearm provide evidence that large feathers were attached to the ulna.',
  }],
});
const badPlayabilityCodes = new Set(badPlayabilityReport.issues.map((issue) => issue.code));
assert(badPlayabilityCodes.has('answer-label-in-option'), 'Answer labels inside options must be blocked.');
assert(badPlayabilityCodes.has('binary-prompt-with-three-options'), 'Binary prompts must not masquerade as three-choice questions.');
assert(badPlayabilityCodes.has('option-too-long'), 'Overlong choices must be blocked.');
assert(badPlayabilityCodes.has('mcq-screen-too-dense'), 'Dense quiz screens must be blocked.');
assert(badPlayabilityReport.issues.some((issue) => issue.severity === 'high'), 'Bad playability must produce a blocking local issue.');

const editorialFindings: EditorialFinding[] = quiz.questions.map((_, questionIndex) => ({
  questionIndex,
  verdict: questionIndex === 0 ? 'review' : 'pass',
  factualStatus: questionIndex === 0 ? 'uncertain' : 'likely_supported',
  confidence: 'medium',
  scores,
  summary: 'Fixture editorial finding.',
  issues: questionIndex === 0 ? ['Time-sensitive wording.'] : [],
}));

const evidenceFindings: EvidenceFinding[] = quiz.questions.map((_, questionIndex) => ({
  questionIndex,
  factualStatus: questionIndex === 0 ? 'contradicted' : 'supported',
  confidence: 'high',
  evidenceSummary: 'Fixture evidence finding.',
  citationTitles: ['Fixture Source'],
  sourceIds: ['source-fixture'],
}));

const report = buildAgentValidationReport({
  dataset: quiz,
  mode: 'evidence',
  model: 'fixture-model',
  structuralReport,
  localReport,
  editorialFindings,
  evidenceFindings,
  packCritique: {
    scores,
    summary: 'The fixture pack is usable after review.',
    strengths: ['Clear basic questions.'],
    issues: ['Two questions repeat the same fact.'],
  },
  sources: [{ id: 'source-fixture', title: 'Fixture Source', url: 'https://example.com/source' }],
  searchEntryPoints: [],
});

assert.equal(report.schema, 'quiz-agent-review/v1');
assert.equal(report.verdict, 'blocked', 'Contradicted evidence must block the pack.');
assert.equal(report.evidenceCoverage.contradicted, 1);
assert.equal(report.questions[0].verdict, 'replace');
assert.equal(report.questions[0].sourceIds[0], 'source-fixture');

console.log(`PASS: agentic validator fixture (${localReport.issues.length} local flags, ${badPlayabilityReport.issues.length} playability blocks, verdict ${report.verdict}).`);
