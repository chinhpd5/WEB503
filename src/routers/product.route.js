import {
  getAllProduct,
  getProductById,
  addProduct,
  updateProduct,
  removeProduct
} from '../controllers/product.controller'

import express from 'express';

const router = express.Router();

// Lấy danh sách sản phẩm
router.get('/',getAllProduct)

//Lấy chi tiết sản phẩm
router.get('/:id',getProductById)

// Lấy danh sách sản phẩm
router.post('/',addProduct)

// Chỉnh sửa sản phẩm
router.put('/:id',updateProduct)

// Xóa sản phẩm
router.delete('/:id',removeProduct)

export default router;