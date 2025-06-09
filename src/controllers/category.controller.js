import Category from "../models/category.model"


export const getAllCaterory = async (req,res) => {
  try {
    
    const categories = await Category.find();
    
    return res.status(200).json({data: categories})

  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}

export const addCategory = async (req, res) =>{
  try {
    const category = await Category.create(req.body);

    return res.status(201).json({
      message: "Thêm mới thành công",
      data: category
     })
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}