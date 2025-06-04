# Kiểm tra quyền trong API

Mục tiêu:
- Sử dụng `middleware` để xác thực `JWT` và kiểm tra quyền dựa trên vai trò người dùng. Sau đó, tích hợp `middleware` này vào API sản phẩm

---
## 1. CheckAuth

`Middleware` này sẽ xác thực `JWT` từ `header` của yêu cầu. Nếu token hợp lệ, `middleware` sẽ giải mã và gắn thông tin người dùng vào `req.userId`

- Tại `middlewares/checkAuth.js`:
```js
export const checkAuth = (req,res,next) =>{
  const header = req.headers["authorization"];
  if(!header){
    return res.status(403).json({message: "Thiếu header"})
  }

  const token = header.split(" ")[1];
  if(!token){
    return res.status(403).json({message: "Thiếu token"})
  }

  jwt.verify(token,"123456",(err,decode) => {
    if(err){
      return res.status(403).json({message: "Sai token hoặc hết hạn"})
    }
    req.userId = decode.id;
  })

  next()
}
```

## 2. Check Permission

`Middleware` này sẽ kiểm tra vai trò của người dùng. Chỉ cho phép người dùng có vai trò phù hợp truy cập `endpoint`.

- Tại `middlewares/checkAuth.js`:
```js
export const checkPermission = (...roles) =>{
  return async (req,res,next) => {
    try {
      const user = await User.findById(req.userId);
      if(!user){
        return res.status(403).json({message: "Không tìm thấy user"})
      }

      const isPermission = roles.includes(user.role)
      if(!isPermission){
        return res.status(403).json({message: "Bạn không có quyền sử dụng chức năng này"})
      }

      next();

    } catch (error) {
      return res.status(500).json({message: error.message})
    }
  }
}
```

- Sử dụng với `endpoint`:
```js
const router = express.Router();

// Routes yêu cầu xác thực
router.use(checkAuth)

router.get('/products', getAllProduct)
router.get('/products/:id', getById)

// Routes chỉ cho admin và staff
router.use(checkPermission("staff", "admin"))

router.post('/products', validateRequest(createProductSchema), addProduct)
router.put('/products/:id', validateRequest(updateProductSchema), updateProduct)
router.delete('/products/:id',deleteProduct)
```



