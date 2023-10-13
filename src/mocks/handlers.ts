// src/mocks/handlers.js
import { rest } from "msw";
import { questionsApi } from "../constants";
import { questions } from "./questions.json";

export const handlers = [
  rest.get(questionsApi, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(questions));
  }),
];
