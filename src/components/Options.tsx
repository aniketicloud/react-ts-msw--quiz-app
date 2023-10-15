import { FC } from "react";
import { QuestionType } from "../types";

interface OptionsProps {
  question: QuestionType;
}

export const Options: FC<OptionsProps> = ({ question }) => {
  return (
    <div className="options">
      {question.options.map((option) => (
        <button className="btn btn-option" key={option}>
          {option}
        </button>
      ))}
    </div>
  );
};
