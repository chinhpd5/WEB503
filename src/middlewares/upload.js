import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads')
  },
  filename: (req,file,callback) =>{
    // đổi tên file
    // Date.now(): 12343748473
    // abc.png : path.extname -> .png
    //  kết quả: 12343748473.png
    const filename = Date.now() + path.extname(file.originalname)
    // thay thế tên file cũ bằng tên mới
    req.body.image = filename;
    callback(null, filename)
  }
})

export const uploadMiddlewareServer = multer({storage: storage})

const storageCloudinary = multer.memoryStorage();
export const uploadMiddlewareCloudDinary = multer({ storage: storageCloudinary });