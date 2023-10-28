import { FC, Dispatch, useEffect } from "react";
import { ActionType } from "../types";

interface TimerProps {
  dispatch: Dispatch<{ type: ActionType.TICK }>;
  secondsRemaining: number;
}

export const Timer: FC<TimerProps> = ({ dispatch, secondsRemaining }) => {
  useEffect(() => {
    const timerId = setInterval(() => {
      dispatch({ type: ActionType.TICK });
    }, 1000);
    return () => clearInterval(timerId);
  }, [dispatch]);
  return <div className="timer">{secondsRemaining}</div>;
};
