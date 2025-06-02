import Joi from 'joi'

const addressSchema = Joi.object({
  street: Joi.string(),
  city: Joi.string(),
  isDefault: Joi.boolean().default(false)
})

export const  registerSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required" : "Tên người dùng là bắt buộc",
    "string.base": "Tên người dùng là chuỗi",
    "string.empty": "Không để trống tên người dùng"
  }),
  email: Joi.string().email().required().messages({
    "any.required" : "Email là bắt buộc",
    "string.base": "Email là chuỗi",
    "string.empty": "Không để trống Email",
    "string.email": "Sai định dạng email"
  }),
  password: Joi.string().required().min(6).messages({
    "any.required" : "Password là bắt buộc",
    "string.base": "Password là chuỗi",
    "string.empty": "Không để trống Password",
    "string.min": "Password cần tối thiểu {{#limit}} ký tự"
  }),
  role: Joi.string().valid("customer", "staff", "admin").default("customer").messages({
    "string.base": "Role phải có kiểu chuỗi",
    "any.only": "Chỉ cho phép các giá trị customer, staff, admin"
  }),
  phone: Joi.string().pattern(/^\d{10}$/).messages({
    "string.base": "SĐT phải có kiểu chuỗi",
    "string.pattern.base": "{{#value}} không đúng định dạng số điện thoại"
  }),
  addresses: Joi.array().items(addressSchema),
  active: Joi.boolean().messages({
    "boolean.base": "Trạng thái cần kiểu boolean"
  })
})

export const loginSchema = Joi.object({
  email: Joi.string().required().email().messages({
    "any.required": "Email là bắt buộc",
    // "string.empty": "Email không để trống",
    // "string.base": "Email là kiểu chuỗi",
    "string.email": "Email sai định dạng"
  }),
  password: Joi.string().required().min(6).messages({
    "any.required": "Password là bắt buộc",
    "string.min": "Password cần tối thiểu {#limit}",
    "string.base": "Password cần có kiểu chuỗi"
  })
})


