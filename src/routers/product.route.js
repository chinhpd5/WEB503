import {
  getAllProduct,
  getProductById,
  addProduct,
  updateProduct,
  removeProduct
} from '../controllers/product.controller';
import {validateRequest} from "../middlewares/validate";
import {createProductSchema,updateProductSchema} from "../validations/product.valid"

import express from 'express';

const router = express.Router();

// Lấy danh sách sản phẩm
router.get('/', getAllProduct)

//Lấy chi tiết sản phẩm
router.get('/:id',getProductById)

// Lấy danh sách sản phẩm
router.post('/',validateRequest(createProductSchema),addProduct)

// Chỉnh sửa sản phẩm
router.put('/:id',validateRequest(updateProductSchema),updateProduct)

// Xóa sản phẩm
router.delete('/:id',removeProduct)

export default router;