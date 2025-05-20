# NodeJS và MongoDB

## MongoDB là gì?
- MongoDB là một cơ sở dữ liệu NoSQL, lưu trữ dữ liệu dưới dạng document (tài liệu) theo định dạng JSON. 
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

### Cài đặt:
```bash
npm install mongoose
```

### Kết nối MongoDB:
```javascript
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));
```


---
## Schema và Model trong Mongoose

### Định nghĩa Schema:
```javascript
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Tạo model từ schema
const User = mongoose.model('User', userSchema);
```

