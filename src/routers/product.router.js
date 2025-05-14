import express from 'express';
const router = express.Router();

const products = [
  {id:1, name:"Sản phẩm 1", price: 100},
  {id:2, name:"Sản phẩm 2", price: 200},
  {id:3, name:"Sản phẩm 3", price: 300},
]

router.get('/products', (req,res) => {
  return res.json(products)
})

router.get('/products/:id', (req,res) => {
  const id = req.params.id;
  console.log(id);
  // lấy sản theo id và trả về sản phẩm
  
})
export default router;
