import { FC } from "react";
// import type { Dispatch } from "react";
import { ActionType } from "../types";

interface NextButtonProps {
  dispatch: any;
  answer: number;
  index: number;
  numQuestions: number;
}

export const NextButton: FC<NextButtonProps> = ({
  answer,
  dispatch,
  index,
  numQuestions,
}) => {
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: ActionType.NEXT_QUESTION })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: ActionType.FINISH })}
      >
        Finish
      </button>
    );
};
