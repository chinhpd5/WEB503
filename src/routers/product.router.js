import express from 'express';
const router = express.Router();

const products = [
  {id:1, name:"Sản phẩm 1", price: 100},
  {id:2, name:"Sản phẩm 2", price: 200},
  {id:3, name:"Sản phẩm 3", price: 300},
]

// Lấy danh sách sản phẩm
router.get('/products', (req,res) => {
  return res.json(products)
})

// Lấy thông tin chi tiết sản phẩm
router.get('/products/:id', (req,res) => {
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
})

// Thêm mới 1 sản phẩm
router.post('/products',(req,res)=> {
  // xử lý logic thêm mới

  // b1: Lấy dữ liệu cần thêm mới
  const data = req.body;
  console.log(data);

  // b2: Thêm mới vào products
  
  // b3: Trả về mảng products đã được thêm
})

// Cập nhật sản phẩm
router.put('/products/:id', (req,res) =>{

})

// Xóa sản phẩm
router.delete('/products/:id',(req,res)=>{

})
export default router;
