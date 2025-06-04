# Đăng ký và Đăng nhập

## Đăng ký
- Tạo model `user` trong `src/models/user.model.js`:
```js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng cung cấp tên"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Vui lòng cung cấp email"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Vui lòng cung cấp địa chỉ email hợp lệ"],
    },
    password: {
      type: String,
      required: [true, "Vui lòng cung cấp mật khẩu"],
      minlength: [6, "Mật khẩu phải có ít nhất 6 ký tự"],
      select: false, // Không trả về password trong query
    },
    role: {
      type: String,
      enum: ["customer", "staff", "admin"],
      default: "customer",
    },
    phone: {
      type: String,
      validate: {
        validator: (v) => /^\d{10}$/.test(v),
        message: (props) => `${props.value} không phải là số điện thoại hợp lệ!`,
      },
    },
    addresses: [
      {
        street: String,
        city: String,
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
    active: {
      type: Boolean,
      default: true
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt và updatedAt
    versionKey: false, // Loại bỏ __v
  }
);

export const User = mongoose.model("User", userSchema);
```

- Tạo validate `registerSchema` trong `src/validations/user.validation.js`:
```js
const addressSchema = Joi.object({
  street: Joi.string(),
  city: Joi.string(),
  isDefault: Joi.boolean().default(false)
})

export const  registerSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required" : "Tên người dùng là bắt buộc",
    "string.base": "Tên người dùng là chuỗi",
    "string.empty": "Không để trống tên người dùng"
  }),
  email: Joi.string().email().required().messages({
    "any.required" : "Email là bắt buộc",
    "string.base": "Email là chuỗi",
    "string.empty": "Không để trống Email",
    "string.email": "Sai định dạng email"
  }),
  password: Joi.string().required().min(6).messages({
    "any.required" : "Password là bắt buộc",
    "string.base": "Password là chuỗi",
    "string.empty": "Không để trống Password",
    "string.min": "Password cần tối thiểu {{#limit}} ký tự"
  }),
  role: Joi.string().valid("customer", "staff", "admin").default("customer").messages({
    "string.base": "Role phải có kiểu chuỗi",
    "any.only": "Chỉ cho phép các giá trị customer, staff, admin"
  }),
  phone: Joi.string().pattern(/^\d{10}$/).messages({
    "string.base": "SĐT phải có kiểu chuỗi",
    "string.pattern.base": "{{#value}} không đúng định dạng số điện thoại"
  }),
  addresses: Joi.array().items(addressSchema),
  active: Joi.boolean().messages({
    "boolean.base": "Trạng thái cần kiểu boolean"
  })
})
```

- Tạo `controller`: `register` xử lý chức năng đăng ký
  + Kiểm tra user có tồn tại, nếu đã tồn tại thông báo.
  + Mã hóa mật khẩu
  + Lưu thông tin
  + Trả về kết quả
```js
export const register = async (req,res) =>{
  try {
    const userExist = await User.findOne({email: req.body.email});
    if(userExist){
      return res.status(400).json({message: `Đã tồn tại ${req.body.email}, vui lòng đổi email khác`})
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword

    const user = await User.create(req.body)
    user.password = undefined;

    return res.status(201).json({
      message: "Đăng ký thành công",
      data: user
    })
    
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}
```

- Tạo router `register` trong `src/router/auth.routers.js`
```js
router.post('/auth/register', register)
```

---
## Đăng nhập

- Tạo validate `loginSchema` trong `src/validations/user.validation.js`:
```js
export const loginSchema = Joi.object({
  email: Joi.string().required().email().messages({
    "any.required": "Email là bắt buộc",
    "string.email": "Email sai định dạng"
  }),
  password: Joi.string().required().min(6).messages({
    "any.required": "Password là bắt buộc",
    "string.min": "Password cần tối thiểu {#limit}",
    "string.base": "Password cần có kiểu chuỗi"
  })
})
```

- Tạo `controller`: `login` xử lý chức năng đăng nhập
  + Kiểm tra user có tồn tại, nếu đã tồn tại thông báo.
  + Kiểu tra mật khẩu có chính xác, nếu không chính xác thông báo
  + Tạo token
  + Trả về kết quả

```js
export const login = async (req,res) => {
  try {
    const user = await User.findOne({email: req.body.email}).select("+password");
    if(!user){
      return res.status(400).json({message: "Sai tài khoản"})
    }

    const isMatch = await bcrypt.compare(req.body.password,user.password);
    if(!isMatch){
      return res.status(400).json({message: "Sai mật khẩu"})
    }

    const token = jwt.sign({id: user.id},"123456",{expiresIn: "5m"})

    user.password = undefined;
    return res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      data: user
    })
    
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}
```

- Tạo router `login` trong `src/router/auth.routers.js`
```js
router.post('/auth/login', register)

```
