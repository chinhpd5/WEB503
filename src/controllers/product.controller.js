import Product from "../models/product.model";

let products = [
  {id: 1, name: 'product 1', price: 1000},
  {id: 2, name: 'product 2', price: 2000},
  {id: 3, name: 'product 3', price: 3000},
]

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find(); // find(): trả về danh sách (Product)

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

export const getProductById = (req, res) => {
  const id = req.params.id;
  // console.log(id);
  
  const product = products.find((item) => {
    return item.id == id
  })

  if(!product){
    return res.status(404).json({
      isSuccess: false,
      messsage: "Không tìm thấy sản phẩm"
    })
  }

  return res.status(200).json({
    isSuccess: true,
    data: product,
    messsage: "Lấy chi tiết sản phẩm thành công"
  })
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

export const updateProduct = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  // console.log(id);
  // console.log(data);

  let findProduct = products.find(item => item.id == id);
  if(!findProduct){
    return res.status(404).json({
      isSuccess: false,
      messsage: "Không tìm thấy sản phẩm"
    })
  }

  // update
  findProduct.name = data.name;
  findProduct.price = data.price;

  return res.status(200).json({
    isSuccess: true,
    data: products,
    messsage: "Cập nhật thành công"
  })
  
}

export const removeProduct = (req,res) => {
  const id = req.params.id;
  // console.log(id);
  
  products = products.filter(item => item.id != id);

  return res.status(200).json({
    isSuccess: true,
    messsage: "Xóa thành công",
    data: products
  })
}