import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Tên sản phẩm là bắt buộc"],
    minlength: [5, "Tên sản phẩm cần tối thiểu 5 ký tự"]
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: [true, "Giá bán là bắt buộc"],
    min: [0, "Giá bán cần lớn hơn 0"]
  },
  quantity: {
    type: Number,
    default: 0
  },
  image:{
    type: String
  },
  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "published"
  },
  featured: {
    type: Boolean,
    default: false
  }
},{
  versionKey: false, // loại bỏ verson của bản ghi (__v:1)
  timestamps: true // thêm createAt: Thời gian tạo, updateAt: Thời gian cập nhật
})

const Product = mongoose.model("Product", productSchema);

export default Product;