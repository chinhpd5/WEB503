import Joi from 'joi'
import { Schema } from 'mongoose'

export const createProductSchema = Joi.object({
  name: Joi.string().required().min(5).messages({
    "string.base": "Tên sản phẩm cần kiểu chuỗi",
    "any.required": "Tên sản phẩm là bắt buộc",
    "string.empty": "Tên sản phẩm không được để trống",
    "string.min": "Tên sản phẩm cần tối thiểu {#limit} ký tự"
  }),
  description: Joi.string().required().messages({
    "string.base": "Mô tả sản phẩm cần kiểu chuỗi",
    "any.required": "Mô tả sản phẩm là bắt buộc",
    "string.empty": "Mô tả sản phẩm không được để trống",
  }),
  price: Joi.number().required().min(0).messages({
    "number.base": "Giá bán cần kiểu số",
    "any.required": "Giá bán là bắt buộc",
    "number.min": "Giá bán cần tối thiểu {#limit} ký tự"
  }),
  quantity: Joi.number().messages({
    "number.base": "Số lượng cần kiểu số",
  }),
  image: Joi.string().messages({
    "string.base": "Hình ảnh cần kiểu dữ liệu chuỗi"
  }),
  status: Joi.string().valid("draft", "published", "archived").messages({ //spread
    "string.base": "Trạng thái cần có kiểu dữ liệu chuỗi",
    "any.only": "Chỉ cho phép các giá trị draft, published hoặc archived"
  }),
  featured: Joi.boolean().messages({
    "boolean.base": "Trạng thái yêu thích cần kiểu boolean"
  })
})

export const updateProductSchema = createProductSchema.fork(
  ["name","description","price"],
  (schema) => schema.optional() // những "name","description","price" không yêu cầu bắt buộc (required)
)