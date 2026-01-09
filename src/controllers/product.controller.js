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