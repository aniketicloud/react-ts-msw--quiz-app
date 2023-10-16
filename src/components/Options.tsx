import { Dispatch, FC } from "react";
import { ActionType, QuestionType } from "../types";

interface OptionsProps {
  question: QuestionType;
  dispatch: Dispatch<{ type: ActionType.NEW_ANSWER; payload: number }>;
  answer: null| number
}

export const Options: FC<OptionsProps> = ({ question, dispatch, answer }) => {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${
            index === answer ? "answer" : ""
          }`}
          key={option}
          onClick={() =>
            dispatch({ type: ActionType.NEW_ANSWER, payload: index })
          }
        >
          {option}
        </button>
      ))}
    </div>
  );
};
