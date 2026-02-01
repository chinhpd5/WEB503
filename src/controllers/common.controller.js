import Upload from "../models/upload.model"

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