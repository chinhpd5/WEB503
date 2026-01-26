import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

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
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category' // khóa ngoại sang bảng category
  }
},{
  versionKey: false, //không lưu trữ version
  timestamps: true, // có thêm thời tạo (createAt), sửa(updateAt)
})

productSchema.plugin(paginate)

const Product = mongoose.model('product',productSchema) // kết nối schema (productSchema) với collection trong mongodb (product)

export default Product;