import { FC, Dispatch } from "react";
import { ActionType } from "../contexts/QuizContext";

interface StartScreenProps {
  numQuestions: number;
  dispatch: Dispatch<{ type: ActionType.START }>;
}

export const StartScreen: FC<StartScreenProps> = ({
  numQuestions,
  dispatch,
}) => {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: ActionType.START })}
      >
        Let's start
      </button>
    </div>
  );
};
