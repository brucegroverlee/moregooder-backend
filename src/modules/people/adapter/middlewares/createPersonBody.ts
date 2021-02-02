import Joi from "joi";

export const createPersonBody = Joi.object({
  name: Joi.string()
    .min(1)
    .required(),
});
