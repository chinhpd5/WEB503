let products = [
  {id:1, name:"Sản phẩm 1", price: 100},
  {id:2, name:"Sản phẩm 2", price: 200},
  {id:3, name:"Sản phẩm 3", price: 300},
]

export const getAllProduct = (req,res) => {
  res.status(200).json(products)
}

export const getById = (req,res) => {
  // b1: Lấy id trên url
  const id = req.params.id;

  // console.log(id);

  // b2: Tìm sản phẩm sử dụng find trong products
  const product = products.find((item) => {
    return item.id == id
  })
  // const product = products.find( item => item.id == id)
  // console.log(product);
  
  // b3: Kiểm tra nếu không có product thì thông báo
  if(!product){
    return res.status(400).json({message: "Không tìm thấy sản phẩm"})
  }
  // b4: Trả về sản phẩm nếu có
  return res.status(200).json(product)
}

export const addProduct = (req,res)=> {
  // xử lý logic thêm mới

  // b1: Lấy dữ liệu cần thêm mới
  const data = req.body;
  // console.log(data);
  
  // b2: Thêm mới vào products
  products.push(data)
  
  // b3: Trả về mảng products đã được thêm
  return res.status(201).json(products)
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