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