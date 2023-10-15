import { useEffect, useReducer } from "react";
import { questionsApi } from "../constants";
import { Loader } from "../components/Loader";
import { Error } from "../components/Error";
import { StartScreen } from "../components/StartScreen";
import { Question } from "../components/Question";

interface Question {
  correctOption: number;
  id: number;
  options: string[];
  points: number;
  question: string;
}

export enum ActionType {
  DATA_RECEIVED,
  DATA_FAILED,
  START,
}

interface State {
  questions: [] | Question[];
  status: QuestionsStatus;
}

enum QuestionsStatus {
  LOADING,
  READY,
  ERROR,
  ACTIVE,
  FINISHED,
}

type Action =
  | { type: ActionType.DATA_RECEIVED; payload: Question[] }
  | { type: ActionType.DATA_FAILED }
  | { type: ActionType.START };

const initialState: State = {
  questions: [],
  status: QuestionsStatus.LOADING,
};

const reducer = (state: State, action: Action) => {
  const { type } = action;
  switch (type) {
    case ActionType.DATA_RECEIVED:
      return { questions: action.payload, status: QuestionsStatus.READY };
    case ActionType.DATA_FAILED:
      return { ...state, status: QuestionsStatus.ERROR };
    case ActionType.START:
      return { ...state, status: QuestionsStatus.ACTIVE };
    default:
      return { ...state };
  }
};

export const QuizContext = () => {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

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

  return (
    <>
      {status === QuestionsStatus.LOADING && <Loader />}
      {status === QuestionsStatus.ERROR && <Error />}
      {status === QuestionsStatus.READY && (
        <StartScreen numQuestions={questions.length} dispatch={dispatch} />
      )}
      {status === QuestionsStatus.ACTIVE && <Question />}
    </>
  );
};
