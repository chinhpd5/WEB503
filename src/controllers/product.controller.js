import Product from "../models/product.model";
import {createProductSchema} from "../validations/product.valid"

export const getAllProduct = async (req, res) => {
  try {
    const {
      search, 
      status,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder = 'asc'
    } = req.query;

    console.log(search,status,minPrice,maxPrice);

    const query = {};

    if(search){
      query.$or= [ // $or: name hoặc slug
        {name: { $regex: search, $options: "i"}}, // tìm kiếm từ khóa gần đúng theo name
        {slug: { $regex: search, $options: "i"}} // tìm kiếm từ khóa gần đúng theo slug
      ]
    }

    if(status != undefined){
      query.status = status
    }

    if(minPrice != undefined || maxPrice != undefined){
      query.price = {};
      if(minPrice != undefined)
        query.price.$gte = minPrice

      if(maxPrice != undefined)
        query.price.$lte = maxPrice
    }

    // console.log(query);

    const sort = {};
    if(sortBy){
      // sortBy = "abc"
      sort[sortBy] = sortOrder == 'asc' ? 1 : -1;
    }

    // console.log(sort);
    
    const products = await Product
      .find(query)
      .sort(sort) // sắp xếp
      .select("name slug status -_id") // lựa chọn trường muốn lấy (- loại bỏ)
    
    return res.status(200).json({
      isSuccess: true,
      message: "Lấy danh sách sản phẩm thành công",
      data: products
    })
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message
    })
  }
}

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);

    if(!product){
      return res.status(404).json({
        isSuccess: false,
        message: "Không tìm thấy sản phẩm"
      })
    }

    return res.status(200).json({
      isSuccess: true,
      message: "Lấy chi tiết sản phẩm thành công",
      data: product
    })
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message
    })
  }
}

export const addProduct = async (req,res) => {
  try {
    const data = req.body;
    
    // create: thêm mới 
    // trả về 1 bản ghi dữ liệu nếu thêm thành công
    const product = await Product.create(data);

    if(!product){
      return res.status(400).json({
        isSuccess: false,
        message: "Thêm Sản phẩm thất bại"
      })
    }

    return res.status(201).json({
      isSuccess: true,
      message: "Thêm mới sản phẩm thành công",
      data: product
    })

  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message
    })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    // new: true => trả về dữ liệu mới sau khi cập nhật
    const updateProduct = await Product.findByIdAndUpdate(id,data,{new: true});

    if(!updateProduct){
      return res.status(400).json({
        isSuccess: false,
        message: "Cập nhật thất bại"
      })
    }

    return res.status(200).json({
      isSuccess: true,
      message: "Cập nhật thành công",
      data: updateProduct
    })

  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message
    })
  }
  
}

export const removeProduct = async (req,res) => {
  try {
    const id = req.params.id;

    const deleteProduct = await Product.findByIdAndDelete(id);

    if(!deleteProduct){
      return res.status(400).json({
        message: "Xóa thất bại",
        isSuccess: false
      })
    }

    return res.status(200).json({
      message: "Xóa thành công",
      isSuccess: true
    })
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message
    })
  }
}