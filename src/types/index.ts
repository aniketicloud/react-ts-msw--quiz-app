export enum ActionType {
  DATA_RECEIVED,
  DATA_FAILED,
  START,
  NEW_ANSWER,
  NEXT_QUESTION,
  FINISH,
  RESTART,
  TICK,
}
export interface QuestionType {
  correctOption: number;
  id: number;
  options: string[];
  points: number;
  question: string;
}
