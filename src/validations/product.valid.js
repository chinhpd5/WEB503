import Joi from "joi";  

export const createProductSchema = Joi.object({
  name: Joi.string().required().min(5).max(20).messages({
    "string.base": "name cần có kiểu chuỗi",
    "any.required": "name cần bắt buộc",
    "string.min": "name cần tối thiểu {#limit} ký tự",
    "string.max": "name cần tối đa {#limit} ký tự",
    "string.empty": "name không được để trống"
  }),
  price: Joi.number().required().min(0).messages({
    "number.base": "price cần có kiểu số",
    "any.required": "price là bắt buộc",
    "number.min": "price cần tối thiểu {#limit}"
  }),
  status: Joi.boolean().messages({
    "boolean.base": "status cần có kiểu boolean"
  }),
  slug: Joi.string().required().messages({
    "string.base": "slug cần có kiểu chuỗi",
    "any.required": "slug cần bắt buộc",
  })
})