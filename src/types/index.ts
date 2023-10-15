
export enum ActionType {
  DATA_RECEIVED,
  DATA_FAILED,
  START,
  NEW_ANSWER
}export interface QuestionType {
  correctOption: number;
  id: number;
  options: string[];
  points: number;
  question: string;
}

