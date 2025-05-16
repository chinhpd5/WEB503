const products = [
  {id:1, name:"Sản phẩm 1", price: 100},
  {id:2, name:"Sản phẩm 2", price: 200},
  {id:3, name:"Sản phẩm 3", price: 300},
]

export const getAllProduct = (req,res) => {
  res.json(products)
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
    return res.json({message: "Không tìm thấy sản phẩm"})
  }
  // b4: Trả về sản phẩm nếu có
  return res.json(product)
}

// export {getAllProduct}