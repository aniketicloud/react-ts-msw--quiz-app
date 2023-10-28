import { FC, Dispatch, useEffect } from "react";
import { ActionType } from "../types";

interface TimerProps {
  dispatch: Dispatch<{ type: ActionType.TICK }>;
  secondsRemaining: number;
}

/**
 * Returns time formatted in MM:SS
 * @param seconds total seconds
 * @returns an object with minutes and seconds
 */
const convertSecondsToMinutesAndSeconds = (
  seconds: number
): { minutes: string; seconds: string } => {
  const formattedMinutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const formattedSeconds = String(seconds % 60).padStart(2, "0");
  return { minutes: formattedMinutes, seconds: formattedSeconds };
};

export const Timer: FC<TimerProps> = ({ dispatch, secondsRemaining }) => {
  const { minutes, seconds } =
    convertSecondsToMinutesAndSeconds(secondsRemaining);
  useEffect(() => {
    const timerId = setInterval(() => {
      dispatch({ type: ActionType.TICK });
    }, 1000);
    return () => clearInterval(timerId);
  }, [dispatch]);
  return (
    <div className="timer">
      {minutes}:{seconds}
    </div>
  );
};
