import Joi from "joi";
import { getListQuery } from "../../../shared/adapters/middlewares/getListQuery";

export const getContactsQuery = getListQuery({
  workspaceId: Joi.number()
    .min(0),
  name: Joi.string()
    .min(1)
    .max(250),
  email: Joi.string()
    .min(1)
    .max(250),
});
