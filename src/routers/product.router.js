import express from 'express';
import {
  getAllProduct,
  getById,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProductWithPaginate
} from '../controllers/product.controller'// destructuring

import {validateRequest} from '../middlewares/validateRequest'
import {createProductSchema,updateProductSchema} from '../validations/product.validation'
import { checkAuth, checkPermission } from '../middlewares/checkAuth';

const router = express.Router();

router.use(checkAuth)
// Lấy danh sách sản phẩm
router.get('/', getAllProduct)
router.get('/with-paginate', getAllProductWithPaginate)

// Lấy thông tin chi tiết sản phẩm
router.get('/:id', getById)


// Kiểm tra quyền "staff" hoặc "admin"
router.use(checkPermission("staff","admin"))
// Thêm mới 1 sản phẩm
router.post('/',validateRequest(createProductSchema), addProduct)

// Cập nhật sản phẩm
router.put('/:id', validateRequest(updateProductSchema), updateProduct)

// Xóa sản phẩm
router.delete('/:id',deleteProduct)

export default router;
