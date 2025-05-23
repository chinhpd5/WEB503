import express from 'express';
import {
  getAllProduct,
  getById,
  addProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller'// destructuring

import {validateRequest} from '../middlewares/validateRequest'
import {createProductSchema,updateProductSchema} from '../validations/product.validation'

const router = express.Router();


// Lấy danh sách sản phẩm
router.get('/products', getAllProduct)

// Lấy thông tin chi tiết sản phẩm
router.get('/products/:id', getById)

// Thêm mới 1 sản phẩm
router.post('/products', validateRequest(createProductSchema), addProduct)

// Cập nhật sản phẩm
router.put('/products/:id', validateRequest(updateProductSchema), updateProduct)

// Xóa sản phẩm
router.delete('/products/:id',deleteProduct)

export default router;
