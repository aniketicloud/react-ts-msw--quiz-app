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

type State = {
  questions: [] | QuestionType[];
  status: QuestionsStatus;
  answer: null | number;
  index: number;
  points: number;
  maxPoints: number;
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
  | {
      type: ActionType.NEW_ANSWER;
      payload: number;
    }
  | {
      type: ActionType.NEXT_QUESTION;
    };

const initialState: State = {
  questions: [],
  status: QuestionsStatus.LOADING,
  answer: null,
  index: 0,
  points: 0,
  maxPoints: 0,
};

const reducer = (state: State, action: Action) => {
  const { type } = action;
  const { index, questions, points } = state;
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
    default: {
      return { ...state };
    }
  }
};

export const QuizContext = () => {
  const [{ questions, status, index, answer, points, maxPoints }, dispatch] =
    useReducer(reducer, initialState);

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
          {answer !== null && <NextButton dispatch={dispatch} />}
        </>
      )}
    </>
  );
};
