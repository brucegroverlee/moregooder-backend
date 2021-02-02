import express from "express";
const peopleRouter = express.Router();

import { authentication } from "../../../shared/middlewares/authentication";
import { validateBody } from "../../../shared/adapters/middlewares/validateBody";

import { createPersonController } from "./createPersonController";
import { createPersonBody } from "../middlewares/createPersonBody";

peopleRouter.post("/people", authentication, validateBody(createPersonBody), createPersonController);

export default peopleRouter;