import { Dispatch, FC } from "react";
import type { ActionType, QuestionType } from "../types";
import { Options } from "./Options";

interface QuestionProps {
  dispatch: Dispatch<{ type: ActionType.NEW_ANSWER; payload: number }>;
  question: QuestionType;
  answer: null| number
}

export const Question: FC<QuestionProps> = ({ question, dispatch, answer }) => {
  return (
    <>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer}/>
    </>
  );
};
