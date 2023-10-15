import { Dispatch, FC } from "react";
import type { ActionType, QuestionType } from "../types";
import { Options } from "./Options";

interface QuestionProps {
  dispatch?: Dispatch<{ type: ActionType.NEW_ANSWER; payload: 1 }>;
  question: QuestionType;
}

export const Question: FC<QuestionProps> = ({ question }) => {
  return (
    <>
      <h4>{question.question}</h4>
      <Options question={question} />
    </>
  );
};
