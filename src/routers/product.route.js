import {
  getAllProduct
} from '../controllers/product.controller'

const products = [
  {id: 1, name: 'product 1', price: 1000},
  {id: 2, name: 'product 2', price: 2000},
  {id: 3, name: 'product 3', price: 3000},
]

import express from 'express';

const router = express.Router();

// Lấy danh sách sản phẩm
router.get('/',getAllProduct)

//Lấy chi tiết sản phẩm
router.get('/:id',(req,res) => {
  res.send('Lấy chi tiết sản phẩm')
})

// Lấy danh sách sản phẩm
router.post('/',(req,res) => {
  res.send("Thêm mới sản phẩm")
})

// Chỉnh sửa sản phẩm
router.put('/:id',(req, res) => {
  res.send("Cập nhật sản phẩm")
})

// Xóa sản phẩm
router.delete('/:id',(req,res) => {
  res.send("Xóa sản phẩm")
})

export default router;