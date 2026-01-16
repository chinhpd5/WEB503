import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    default: true // mặc định là true
  },
  slug: {
    type: String,
    required: true,
    unique: true // không được trùng với bản ghi khác
  }
},{
  versionKey: false, //không lưu trữ version
  timestamps: true, // có thêm thời tạo (createAt), sửa(updateAt)
})

const Product = mongoose.model('product',productSchema) // kết nối schema (productSchema) với collection trong mongodb (product)

export default Product;