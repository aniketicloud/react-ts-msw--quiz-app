import { FC } from "react";

interface ProgressProps {
  numQuestion: number;
  index: number;
  points: number;
  maxPoints: number;
  answer: number | null;
}

export const Progress: FC<ProgressProps> = ({
  numQuestion,
  index,
  points,
  maxPoints,
  answer,
}) => {
  return (
    <header className="progress">
      <progress max={numQuestion} value={index + Number(answer !== null)} />
      <p>
        Question{" "}
        <strong>
          {index + 1}/{numQuestion}
        </strong>
      </p>
      <p>
        <strong>
          {points} / {maxPoints}
        </strong>
      </p>
    </header>
  );
};
