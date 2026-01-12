let products = [
  {id: 1, name: 'product 1', price: 1000},
  {id: 2, name: 'product 2', price: 2000},
  {id: 3, name: 'product 3', price: 3000},
]

export const getAllProduct = (req, res) => {
  // console.log(req.query);
  const key = req.query.search;
  
  let newProducts = products;
  if(key){
    newProducts = products.filter((item)=>{
      return item.name.includes(key)
    })
  }

  return res.status(200).json({
    isSuccess: true,
    data: newProducts,
    messsage: "Lấy danh sách thành công"
  })
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

export const addProduct = (req,res) => {
  const data = req.body;
  console.log(data);
  products.push(data);

  return res.status(201).json({
    isSuccess: true,
    data: products,
    messsage: "Thêm mới thành công"
  })
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