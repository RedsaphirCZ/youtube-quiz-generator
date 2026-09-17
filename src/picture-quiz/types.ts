export type PictureQuizCategory =
  | 'brands'
  | 'country-shapes'
  | 'emoji'
  | 'flags'
  | 'landmarks'
  | 'people'
  | 'objects'
  | 'custom';

export interface PictureQuestionImage {
  src: string;
  alt: string;
  credit?: string;
  sourceUrl?: string;
}

export interface PictureQuestion {
  type: 'picture_mcq';
  question: string;
  image: PictureQuestionImage;
  options: [string, string] | [string, string, string];
  correctIndex: 0 | 1 | 2;
  explanation: string;
}

export interface PictureQuizDataset {
  schema: 'picture-quiz/v1';
  id: string;
  title: string;
  description: string;
  category: PictureQuizCategory;
  questions: PictureQuestion[];
  createdAt: string;
}

export interface PicturePromptConfig {
  title: string;
  topic: string;
  category: PictureQuizCategory;
  questionCount: number;
  answerChoiceCount: 2 | 3;
  difficulty: 'easy' | 'easy-medium' | 'medium' | 'challenging';
  specialInstructions: string;
}
