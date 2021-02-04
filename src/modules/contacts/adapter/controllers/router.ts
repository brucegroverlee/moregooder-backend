import express from "express";
const contactsRouter = express.Router();

import { authentication } from "../../../shared/middlewares/authentication";
import { validateBody } from "../../../shared/adapters/middlewares/validateBody";

import { createPersonController } from "./createPersonController";
import { createContactBody } from "../middlewares/createContactBody";

contactsRouter.post("/contacts", authentication, validateBody(createContactBody), createPersonController);

export default contactsRouter;