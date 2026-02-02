import {
  getAllProduct,
  getProductById,
  addProduct,
  updateProduct,
  removeProduct,
  getAllProductPaginate
} from '../controllers/product.controller';
import { checkAuth, checkPermission } from '../middlewares/auth';
import {validateRequest} from "../middlewares/validate";
import {createProductSchema,updateProductSchema} from "../validations/product.valid"

import express from 'express';

const router = express.Router();

router.use(checkAuth);

router.use(checkPermission("user","admin","staff"))
// Lấy danh sách sản phẩm
router.get('/', getAllProduct)

router.get('/paginate', getAllProductPaginate)

//Lấy chi tiết sản phẩm
router.get('/:id',getProductById)

// Thêm mới sản phẩm
router.post('/',checkPermission("admin"),validateRequest(createProductSchema),addProduct)

// Chỉnh sửa sản phẩm
router.put('/:id',checkPermission("admin","staff"),validateRequest(updateProductSchema),updateProduct)

// Xóa sản phẩm
router.delete('/:id',checkPermission("admin"),removeProduct)


export default router;