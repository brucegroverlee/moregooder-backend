import Joi from "joi";

export const createContactBody = Joi.object({
  workspaceId: Joi.number()
    .min(0)
    .required(),
  name: Joi.string()
    .min(1)
    .required(),
  email: Joi.string()
    .min(1)
    .required(),
});
