# Thực hành CRUD với MongoDB và Mongoose

## Mục tiêu
- Thực hành xây dựng API CRUD đầy đủ với MongoDB và Mongoose.
- Hiểu cách tổ chức code với models, controllers, và routers.
- Làm quen với cách xử lý lỗi và phản hồi trạng thái HTTP.

---
## MongoDB là gì?
- MongoDB là một hệ quản trị cơ sở dữ liệu NoSQL, lưu trữ dữ liệu dưới dạng document (tài liệu) theo định dạng JSON. 
- MongoDB được thiết kế để lưu trữ dữ liệu có cấu trúc linh hoạt và có khả năng mở rộng cao.

### NoSQL là gì?
- NoSQL là viết tắt của "Not Only SQL". 
- Đây là một nhóm hệ quản trị cơ sở dữ liệu phi quan hệ (non-relational databases), được thiết kế để lưu trữ và truy xuất dữ liệu một cách linh hoạt, nhanh chóng và có khả năng mở rộng cao.
- Phù hợp với các ứng dụng web hiện đại, xử lý lượng lớn dữ liệu phi cấu trúc hoặc bán cấu trúc.

### Các đặc điểm chính của MongoDB:
- Schema-less: Không cần định nghĩa cấu trúc dữ liệu trước
- Document-oriented: Dữ liệu được lưu dưới dạng document (JSON)
- High Performance: Hiệu suất cao trong việc đọc/ghi dữ liệu
- Scalability: Dễ dàng mở rộng theo chiều ngang
- Rich Query Language: Hỗ trợ nhiều loại truy vấn phức tạp

### Cài đặt MongoDB và MongoDB Compass

1. Tải MongoDB Community Server
- Truy cập trang web chính thức: https://www.mongodb.com/try/download/community
- Chọn phiên bản phù hợp với hệ điều hành
- Tích chọn "Include MongoDB Compass" trong quá trình tải
- Tải file cài đặt về máy

2. Cài đặt MongoDB
- Windows:
  + Chạy file .msi đã tải về
  + Chọn "Complete" installation
  + Đảm bảo tích chọn "Install MongoDB Compass"
  + Làm theo các bước trong wizard để hoàn tất cài đặt

3. Sử dụng MongoDB Compass
- Khởi động MongoDB Compass
- Kết nối đến MongoDB:
  + URL mặc định: mongodb://localhost:27017
  + Click "Connect" để kết nối đến server local

4. Các thao tác cơ bản với Compass:
- Tạo Database mới: Click "Create Database"
- Tạo Collection: Chọn database > "Create Collection"
- Thêm document: Chọn collection > "Add Data"
- Tìm kiếm: Sử dụng filter bar
- Cập nhật: Double click vào document
- Xóa: Chọn document > Delete

---
## Mongoose là gì?
- Mongoose là một ODM (Object-Document Mapping) thư viện cho MongoDB và Node.js. Nó giúp định nghĩa schema, validation, tự động ánh xạ và các phương thức cho MongoDB collections.

- Ngược lại ODM là ORM (Object-Relational Mapping) thư viện dành cho các hệ quản trị cơ sở dữ liệu quan hệ (SQL) (MySQL, SQL Server, PostgreSQL,...)

---
## 2 Hướng dẫn thực hành

### Cài đặt:
```bash
npm install mongoose
```

### Kết nối MongoDB:
- Tại `src/index.js`
```javascript
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/my_database')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));
```

### Định nghĩa Schema:
- Tạo Schema với các kiểu dữ liệu: `String`, `Number`, `Date`, `Buffer`, `Boolean`, `ObjectId`, `Array`, `Mixed` ...
- Tùy chỉnh schema với các thuộc tính như: `required`, `default`, `enum`, `validate`, `min`, `max`, `unique`...
- Tại `src/models` tạo file `product.model.product.js`:
```javascript
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: [true, "Tên sản phẩm là bắt buộc"],
    trim: true,
    maxlength: [200, "Tên sản phẩm không được vượt quá 200 ký tự"],
  },
  description: {
    type: String,
    required: [true, "Mô tả sản phẩm là bắt buộc"],
  },
  price: {
    type: Number,
    required: [true, "Giá sản phẩm là bắt buộc"],
    min: [0, "Giá sản phẩm không được âm"],
},
  images: [String],
  stock: {
    type: Number,
    required: [true, "Số lượng tồn kho là bắt buộc"],
    min: [0, "Số lượng tồn kho không được âm"],
    default: 0,
},
  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "draft",
  },
  featured: {
    type: Boolean,
    default: false,
  }
},
{ timestamps: true, versionKey: false }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
```

Tại `src/controller/product.controller.js` :

```js
import Product from "../models/product.model"

export const getAllProduct = async (req,res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      message: "Lấy danh sách thành công",
      data: products
    })

  } catch (error) {
    return res.status(400).json({message: error.message})
  }
}

export const getById = async (req,res) => {
  try {
    const product = await Product.findById(req.params.id);

    if(!product){
      return res.status(404).json({message: "Không tìm thấy sản phẩm"})
    }

    return res.status(200).json({
      message: "Lấy dữ liệu thành công",
      data: product
    })

  } catch (error) {
    return res.status(400).json({message: error.message})
  }
}

export const addProduct = async (req,res)=> {
  try {
    const newProduct = await Product.create(req.body)

    return res.status(201).json({
      message: "Thêm thành công",
      data: newProduct
    })

  } catch (error) {
    return res.status(400).json({message: error.message})
  }
}

export const updateProduct = async (req, res) =>{
  try {
    const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body,{
      new: true, // trả về giá trị sau khi cập nhật
      runValidators: true, // kiểm tra validate
    })

    if(!updateProduct){
      return res.status(400).json({message: "Cập nhật sản phẩm thất bại"})
    }

    return res.status(200).json({
      message: "Cập nhật thành công",
      data: updateProduct
    })

  } catch (error) {
    return res.status(400).json({message: error.message})
  }
}

export const deleteProduct = async (req,res) =>{
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if(!product){
      return res.status(404).json({message: "Không tìm thấy sản phẩm"})
    }

    return res.status(200).json({
      message: "Xóa sản phẩm thành công"
    })
  } catch (error) {
    return res.status(400).json({message: error.message})
  }
}
```

