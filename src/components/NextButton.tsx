import { FC } from "react";
import type { Dispatch } from "react";
import { ActionType } from "../types";

interface NextButtonProps {
  dispatch: Dispatch<{ type: ActionType.NEXT_QUESTION }>;
}

export const NextButton: FC<NextButtonProps> = ({
  dispatch,
}) => {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: ActionType.NEXT_QUESTION })}
      >
        Next
      </button>
    );
};
