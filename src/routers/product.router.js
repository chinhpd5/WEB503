import express from 'express';
import {
  getAllProduct,
  getById
} from '../controllers/product.controller'// destructuring

const router = express.Router();


// Lấy danh sách sản phẩm
router.get('/products', getAllProduct)

// Lấy thông tin chi tiết sản phẩm
router.get('/products/:id', getById)

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
