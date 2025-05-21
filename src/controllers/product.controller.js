import Product from "../models/product.model"

let products = [
  {id:1, name:"Sản phẩm 1", price: 100},
  {id:2, name:"Sản phẩm 2", price: 200},
  {id:3, name:"Sản phẩm 3", price: 300},
]

export const getAllProduct = async (req,res) => {
  try {
    const products = await Product.find();

    return res.status(200).json({
      message: "Lấy danh sách thành công",
      data: products
    })

  } catch (error) {
    
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
    
  }
}

export const addProduct = async (req,res)=> {
  try {
    // console.log(req.body);

    // Cách 1:
    // const product = new Product(req.body);
    // await product.save();

    // Cách 2:
    const newProduct = await Product.create(req.body)

    return res.status(201).json({
      message: "Thêm thành công",
      data: newProduct
    })

  } catch (error) {
    
  }
}

export const updateProduct = (req, res) =>{
  // b1: lấy id
  const id = req.params.id;
  // console.log(id);

  // b2: lấy data
  const data = req.body;
  // console.log(data);
  
  // b3: Kiểm tra sản phẩm có tồn tại hay không
  const product = products.find((item) =>{
    return item.id == id
  })

  if(!product){
    return res.status(400).json({message: "Không tồn tại sản phẩm"})
  }

  // b4: Nếu có sản phẩm thì cập nhật
  product.name = data.name;
  product.price = data.price;

  // b5: Trả về dữ liệu
  return res.json(products)
}

export const deleteProduct = (req,res) =>{
  // b1: lấy id
  const id = req.params.id;
  // console.log(id);

  // b2: Kiểm tra sản phẩm có tồn tại hay không?
  const product = products.find(item => item.id == id);
  if(!product){
    return res.status(400).json({message: "Không tìm thấy sản phẩm"})
  }

  // b3: Xóa sản phẩm
  products = products.filter(item => item.id != id)
  
  // b4: Trả về mảng
  return res.json(products)
}

// export {getAllProduct}