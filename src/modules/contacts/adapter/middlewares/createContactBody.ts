import Joi from "joi";

export const createContactBody = Joi.object({
  name: Joi.string()
    .min(1)
    .required(),
  email: Joi.string()
    .min(1)
    .required(),
});
