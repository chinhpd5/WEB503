# Upload

Trong Node.js, upload thường đề cập đến quá trình tải lên (upload) file từ client (trình duyệt) lên server. Đây là một thao tác phổ biến trong các ứng dụng web, ví dụ như khi người dùng tải lên hình ảnh đại diện, tài liệu, hoặc file Excel.

---
## Upload lưu trữ trên server

Chuẩn bị: 
- Cài đặt thư viện `multer`
```bash
npm install multer
```
- Tạo thư mục lưu trữ `src/uploads`.

Tạo `middleware` `upload` tại `src/middlewares/upload.js`
```js
import multer from "multer";
import path from 'path'

const storage = multer.diskStorage({
  // khai báo nơi lưu trữ file
  destination: (req, file, callback) => {
    callback(null, 'src/uploads')
  },
  // xử lý đổi tên file
  filename: (req, file, callback) => {
    const filename = Date.now() + path.extname(file.originalname);
    req.body.image = filename;
    callback(null, filename);
  }
})

export const upload = multer({ storage })
```
Khai báo cho phép truy cập trực tiếp đường dẫn tĩnh tại `src/index.js`
```js
import path from 'path';

app.use(express.static(path.join(__dirname,'uploads')));
```


## Upload lưu trữ trên Cloudinary
Cloudinary là một nền tảng đám mây dùng để lưu trữ, quản lý, tối ưu hóa và phân phối hình ảnh và video cho các ứng dụng web và mobile.

Chuẩn bị:
- Cài đặt thư viện: `cloudinary`, `dotenv`
```bash
npm install cloudinary dotenv
```
- Tạo tài khoản trên `[text](https://cloudinary.com/)`.
- Tạo file env:
```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Tạo `middleware` `uploadCloudinary` tại `src/middlewares/upload.js`
```js
import multer from 'multer';

const storage = multer.memoryStorage();

export const upload = multer({ storage });
```

Cấu hình `Cloudinary` tại `src/utils/cloudinary.js`:
```js
// src/utils/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;
```

Sử lý `controller`:
```js
export const uploadCloudinary = async (req,res) =>{
  try {
    const fileStr = req.file.buffer.toString('base64');
    const uploadedResponse = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${fileStr}`,
      {
        folder: 'uploads' // tùy chọn, có thể bỏ
      }
    );

    // Lưu trữ trong db
    // ...
    
    return res.status(200).json({
      message: 'Upload thành công!',
      url: uploadedResponse.secure_url
    });
  } catch (err) {
    return res.status(500).json({ error: 'Upload thất bại', details: err.message });
  }
}
```