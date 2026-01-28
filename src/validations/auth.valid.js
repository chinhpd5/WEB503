import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "name là bắt buộc",
    "string.base": "name phải có kiểu chuỗi",
    "string.empty": "name không được để trống"
  }),
  email: Joi.string().email().required().messages({
    "any.required": "eamil là bắt buộc",
    "string.base": "eamil phải có kiểu chuỗi",
    "string.empty": "eamil không được để trống",
    "string.email": "email sai định dạng"
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "passwrod là bắt buộc",
    "string.base": "passwrod phải có kiểu chuỗi",
    "string.empty": "passwrod không được để trống",
    "string.min": "passwrod cần tối thiểu {#limit} ký tự",
  }),
  role: Joi.string().valid("user","admin","staff").messages({
    "string.base": "role phải có kiểu chuỗi",
    "string.empty": "role không được để trống",
    "any.only": "role chỉ nhận 'user' hoặc 'admin' hoặc 'staff'"
  })
})