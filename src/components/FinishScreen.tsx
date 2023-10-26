import { Dispatch, FC } from "react";
import { ActionType } from "../types";

interface FinishScreenProps {
  points: number;
  maxPoints: number;
  highscore: number;
  dispatch: Dispatch<{ type: ActionType.RESTART }>;
}

export const FinishScreen: FC<FinishScreenProps> = ({
  maxPoints,
  points,
  highscore,
  dispatch,
}) => {
  const percentage = Math.ceil((points / maxPoints) * 100);
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: ActionType.RESTART })}
      >
        Restart quiz
      </button>
    </>
  );
};
