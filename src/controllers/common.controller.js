import Upload from "../models/upload.model"
import cloudinary from "../utils/cloudinary";

export const upload = async (req,res) =>{
  try {
    const upload = await Upload.create({image: req.body.image});

    upload.image = `http://localhost:3000/${upload.image}`

    return res.status(201).json({
      message: "Upload thành công",
      data: upload
    })
    
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const uploadinary = async (req,res) =>{
   try {
    const fileStr = req.file.buffer.toString('base64');
    const uploadedResponse = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${fileStr}`,
      {
        folder: 'web503.01' // tùy chọn, có thể bỏ
      }
    );

    // lưu trữ trong db
    await Upload.create({image: uploadedResponse.secure_url})
    
    return res.status(200).json({
      message: 'Upload thành công!',
      url: uploadedResponse.secure_url
    });
  } catch (err) {
    return res.status(500).json({ error: 'Upload thất bại', details: err.message });
  }
}