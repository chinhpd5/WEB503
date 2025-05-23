import Product from "../models/product.model"
import {createProductSchema} from '../validations/product.validation'

export const getAllProduct = async (req,res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      message: "Lấy danh sách thành công",
      data: products
    })

  } catch (error) {
    return res.status(400).json({message: error.message})
  }
}

export const getById = async (req,res) => {
  try {
    const product = await Product.findById(req.params.id);

    if(!product){
      return res.status(404).json({message: "Không tìm thấy sản phẩm"})
    }

    return res.status(200).json({
      message: "Lấy dữ liệu thành công",
      data: product
    })

  } catch (error) {
    return res.status(400).json({message: error.message})
  }
}

export const addProduct = async (req,res)=> {
  try {
    // console.log(req.body);

    // Cách 1:
    // const product = new Product(req.body);
    // await product.save();

    // Cách 2:
    const {error,value} = createProductSchema.validate(req.body,{
      abortEarly: false, // thông báo tất cả các lỗi nếu có
      stripUnknown: true, // loại bỏ những thuộc tính dư thừa
    })

    if(error){
      return res.status(400).json({
        message: error.details.map(item => item.message)
      })
    }
    
    const newProduct = await Product.create(req.body)

    return res.status(201).json({
      message: "Thêm thành công",
      data: newProduct
    })

  } catch (error) {
    return res.status(400).json({message: error.message})
  }
}

export const updateProduct = async (req, res) =>{
  try {
    const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body,{
      new: true, // trả về giá trị sau khi cập nhật
      runValidators: true, // kiểm tra validate
    })

    if(!updateProduct){
      return res.status(400).json({message: "Cập nhật sản phẩm thất bại"})
    }

    return res.status(200).json({
      message: "Cập nhật thành công",
      data: updateProduct
    })

  } catch (error) {
    return res.status(400).json({message: error.message})
  }
}

export const deleteProduct = async (req,res) =>{
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if(!product){
      return res.status(404).json({message: "Không tìm thấy sản phẩm"})
    }

    return res.status(200).json({
      message: "Xóa sản phẩm thành công"
    })
  } catch (error) {
    return res.status(400).json({message: error.message})
  }
}

// export {getAllProduct}