import Upload from "../models/upload.model"
import cloudinary from "../utils/cloudinary"

export const uploadToServer = async (req,res) =>{
  try {
    const data = req.body;

    const upload = await Upload.create(data);

    return res.status(201).json({
      isSuccess: true,
      message: "upload thành công",
      data: {
        // image: `http://localhost:3000/${upload.image}`
        image: `${process.env.API_URL}:${process.env.PORT}/${upload.image}`
      }
    })
    
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message
    })
  }
}

export const uploadCloudinary = async (req,res) =>{
  try {
    const fileStr = req.file.buffer.toString('base64');
    const uploadedResponse = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${fileStr}`,
      {
        folder: 'web503' // tùy chọn, có thể bỏ
      }
    );

    // Lưu trữ trong db
    // ...
    const upload = await Upload.create({image: uploadedResponse.secure_url})
    
    return res.status(200).json({
      isSuccess: true,
      message: 'Upload thành công!',
      data: upload
    });
  } catch (err) {
    console.log(err);
    
    return res.status(500).json({ error: 'Upload thất bại', details: err.message });
  }
}