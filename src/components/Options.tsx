import { FC } from "react";
import { QuestionType } from "../types";

interface OptionsProps {
  question: QuestionType;
}

export const Options: FC<OptionsProps> = ({ question }) => {
  return (
    <>
      <h3>Question: {question.question}</h3>
    </>
  );
};
