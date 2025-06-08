import Upload from "../models/upload.model"

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