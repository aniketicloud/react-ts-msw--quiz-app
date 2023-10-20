import { FC } from "react";

interface FinishScreenProps {
  points: number;
  maxPoints: number;
}

export const FinishScreen: FC<FinishScreenProps> = ({ maxPoints, points }) => {
  return (
    <p className="result">
      You scored <strong>{points}</strong> out of {maxPoints} (
      {Math.ceil((points / maxPoints) * 100)})
    </p>
  );
};
