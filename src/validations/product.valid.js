import Joi from "joi";  

export const createProductSchema = Joi.object({
  name: Joi.string().required().min(5).max(20),
  price: Joi.number().required().min(0),
  status: Joi.boolean(),
  slug: Joi.string().required()
})