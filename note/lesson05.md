# Model trong MVC, Kết nối với cơ sở dữ liệu MongoDB

Mục tiêu bài học
- Hiểu vai trò của `Model` trong mô hình `MVC`
- Hiểu `MongoDB` là gì và vì sao phù hợp với `NodeJS`
- Biết cách kết nối `NodeJS` với `MongoDB`
- Xây dựng `Model` bằng `Mongoose`
- Thực hiện các thao tác `CRUD` cơ bản thông qua `Model`

## 1. Thiết kế cơ sở dữ liệu

## 2. Model trong mô hình MVC là gì?
### 2.1. Khái niệm Model
- Đại diện cho dữ liệu
- Chịu trách nhiệm tương tác với cơ sở dữ liệu
- Định nghĩa cấu trúc dữ liệu và logic liên quan đến dữ liệu
> - `Controller` không làm việc trực tiếp với `database`
> - `Controller` gọi Model
> - `Model` xử lý dữ liệu và trả kết quả

### 2.2. Vai trò của Model
- Định nghĩa cấu trúc dữ liệu (`schema`)
- Thực hiện `CRUD`:
  + Create (tạo)
  + Read (đọc)
  + Update (cập nhật)
  + Delete (xóa)
- Kiểm tra và ràng buộc dữ liệu
- Đảm bảo tính nhất quán của dữ liệu


## 3. MongoDB là gì?
### 3.1. Giới thiệu MongoDB
`MongoDB` là hệ quản trị cơ sở dữ liệu `NoSQL`, lưu trữ dữ liệu dưới dạng `document` (JSON-like).
Ví dụ:
```json
{
  "name": "Anh Hai",
  "age": 30,
  "email": "anhhai@gmail.com"
}
```
### 3.2. Vì sao chọn MongoDB cho NodeJS?
| Lý do     | Giải thích                  |
| --------- | --------------------------- |
| JSON-like | Dữ liệu gần giống object JS |
| Linh hoạt | Không cần schema cứng       |
| Hiệu năng | Phù hợp API, real-time      |
| Phổ biến  | Dễ học, cộng đồng lớn       |

### 3.3 Cài đặt MongoDB
Link tải: https://www.mongodb.com/try/download/community

### 3.4. Mongoose là gì?
`Mongoose` là thư viện `ODM` (Object Data Modeling) cho `MongoDB` trong `NodeJS`.
- Kết nối `MongoDB`
- Định nghĩa `schema`
- Tạo `model`
- Hỗ trợ `validate` dữ liệu
- Thao tác `database` bằng cú pháp `JS`

### 3.5. Kết nối NodeJS với MongoDB
#### 3.5.1. Cài đặt Mongoose
```bash
npm install mongoose
```

#### 3.5.2. Tạo file kết nối database
Tại file `src/config/database.js`
```js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/db_name');
    console.log('Kết nối MongoDB thành công');
  } catch (error) {
    console.error('Kết nối MongoDB thất bại', error);
  }
};

export default connectDB;
```

#### 3.5.3. Gọi kết nối trong app
Tại file `src/app.js`
```js
import express from 'express';
import connectDB from './config/database';

const app = express();
connectDB();
```

### 3.6. Xây dựng Model với Mongoose
#### 3.6.1. Tạo Schema
Tại `src/models/product.model.js`:
```js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  pice: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});
```

#### 3.6.2. Tạo Model
Tại `src/models/product.model.js`:
```js
const Product = mongoose.model('Product', productSchema);

export default Product;
```