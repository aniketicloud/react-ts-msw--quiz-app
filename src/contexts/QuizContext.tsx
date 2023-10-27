import { useEffect, useReducer } from "react";
import { questionsApi } from "../constants";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { StartScreen } from "../components/StartScreen";
import { Question } from "../components/Question";
import { ActionType } from "../types";
import type { QuestionType } from "../types";
import { NextButton } from "../components/NextButton";
import { Progress } from "../components/Progress";
import { FinishScreen } from "../components/FinishScreen";
import { Footer } from "../components/Footer";
import { Timer } from "../components/Timer";

// TODO: Add timer and restart

type State = {
  questions: [] | QuestionType[];
  status: QuestionsStatus;
  answer: null | number;
  index: number;
  points: number;
  maxPoints: number;
  highscore: number;
  secondsRemaining: number;
};

enum QuestionsStatus {
  LOADING,
  READY,
  ERROR,
  ACTIVE,
  FINISHED,
}

type Action =
  | { type: ActionType.DATA_RECEIVED; payload: QuestionType[] }
  | { type: ActionType.DATA_FAILED }
  | { type: ActionType.START }
  | { type: ActionType.NEW_ANSWER; payload: number }
  | { type: ActionType.NEXT_QUESTION }
  | { type: ActionType.FINISH }
  | { type: ActionType.RESTART }
  | { type: ActionType.TICK };

const initialState: State = {
  questions: [],
  status: QuestionsStatus.LOADING,
  answer: null,
  index: 0,
  points: 0,
  maxPoints: 0,
  highscore: 0,
  secondsRemaining: 10,
};

const reducer = (state: State, action: Action) => {
  const { type } = action;
  const { index, questions, points, highscore, secondsRemaining } = state;
  switch (type) {
    case ActionType.DATA_RECEIVED: {
      const maxPoints = questions.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.points;
      }, 0);
      return {
        ...state,
        questions: action.payload,
        status: QuestionsStatus.READY,
        maxPoints,
      };
    }
    case ActionType.DATA_FAILED: {
      return { ...state, status: QuestionsStatus.ERROR };
    }
    case ActionType.START: {
      return { ...state, status: QuestionsStatus.ACTIVE };
    }
    case ActionType.NEW_ANSWER: {
      const currentQuestion = questions.at(index);
      return {
        ...state,
        answer: action.payload,
        points:
          currentQuestion?.correctOption === action.payload
            ? points + currentQuestion.points
            : points,
      };
    }
    case ActionType.NEXT_QUESTION: {
      return { ...state, index: index + 1, answer: null };
    }
    case ActionType.FINISH: {
      return {
        ...state,
        highscore: points > highscore ? points : highscore,
        status: QuestionsStatus.FINISHED,
      };
    }
    case ActionType.RESTART: {
      return { ...initialState, questions, status: QuestionsStatus.READY };
    }
    case ActionType.TICK: {
      return {
        ...state,
        secondsRemaining: secondsRemaining - 1,
        status:
          secondsRemaining === 0 ? QuestionsStatus.FINISHED : state.status,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export const QuizContext = () => {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      maxPoints,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const resp = await fetch(questionsApi);
        const questions = await resp.json();
        dispatch({ type: ActionType.DATA_RECEIVED, payload: questions });
      } catch (error) {
        dispatch({ type: ActionType.DATA_FAILED });
      }
    };

    fetchUsers();
  }, []);

  const numQuestions = questions.length;

  return (
    <>
      {status === QuestionsStatus.LOADING && <Loader />}
      {status === QuestionsStatus.ERROR && <Error />}
      {status === QuestionsStatus.READY && (
        <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
      )}
      {status === QuestionsStatus.FINISHED && (
        <FinishScreen
          maxPoints={maxPoints}
          points={points}
          highscore={highscore}
          dispatch={dispatch}
        />
      )}
      {status === QuestionsStatus.ACTIVE && (
        <>
          <Progress
            index={index}
            numQuestion={numQuestions}
            points={points}
            maxPoints={maxPoints}
            answer={answer}
          />
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
          <Footer>
            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            {answer !== null && index < numQuestions - 1 && (
              <NextButton dispatch={dispatch} />
            )}
          </Footer>
          {answer !== null && index === numQuestions - 1 && (
            <button
              className="btn btn-ui"
              onClick={() => dispatch({ type: ActionType.FINISH })}
            >
              Finish
            </button>
          )}
        </>
      )}
    </>
  );
};
