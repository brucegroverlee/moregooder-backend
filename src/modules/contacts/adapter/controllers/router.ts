import express from "express";
const contactsRouter = express.Router();

import { authentication } from "../../../shared/middlewares/authentication";
import { validateBody } from "../../../shared/adapters/middlewares/validateBody";
import { validateQuery } from "../../../shared/adapters/middlewares/validateQuery";

import { createContactController } from "./createContactController";
import { createContactBody } from "../middlewares/createContactBody";

import { getContactsController } from "./getContactsController";
import { getContactsQuery } from "../middlewares/getContactsQuery";

contactsRouter.post("/contacts", authentication, validateBody(createContactBody), createContactController);
contactsRouter.get("/contacts", authentication, validateQuery(getContactsQuery), getContactsController);

export default contactsRouter;