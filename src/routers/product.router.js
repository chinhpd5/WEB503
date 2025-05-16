import express from 'express';
import {
  getAllProduct,
  getById,
  addProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller'// destructuring

const router = express.Router();


// Lấy danh sách sản phẩm
router.get('/products', getAllProduct)

// Lấy thông tin chi tiết sản phẩm
router.get('/products/:id', getById)

// Thêm mới 1 sản phẩm
router.post('/products',addProduct)

// Cập nhật sản phẩm
router.put('/products/:id', updateProduct)

// Xóa sản phẩm
router.delete('/products/:id',deleteProduct)

export default router;
