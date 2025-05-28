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

- Tạo router `auth` trong `src/router/auth.routers.js`
```js
router.post('/auth/register', register)

```
- Tạo `controller`: `register` xử lý chức năng đăng ký
+ Kiểm tra user có tồn tại, nếu đã tồn tại thông báo.
+ Mã hóa mật khẩu
+ Lưu thông tin
+ Trả về kết quả