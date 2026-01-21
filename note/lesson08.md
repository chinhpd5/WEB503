# Middleware Validate dữ liệu đầu vào trong Express

## Mục tiêu
- Hiểu cách viết middleware để validate dữ liệu đầu vào.
- So sánh Joi với validate từ model và các thư viện khác.
- Thực hành áp dụng middleware cho các thao tác create và put.

---
## 1. Joi là gì?
Joi là một thư viện JavaScript mạnh mẽ, giúp chúng ta kiểm tra dữ liệu đầu vào một cách dễ dàng và rõ ràng. Nó cho phép định nghĩa các quy tắc (schema) để kiểm tra dữ liệu và trả về lỗi nếu dữ liệu không hợp lệ.

Một số thư viện validate khác: yub, zob, validate.js,...

### Tính năng nổi bật của Joi:
- Định nghĩa schema rõ ràng: Dễ dàng định nghĩa các quy tắc kiểm tra dữ liệu.
- Hỗ trợ nhiều kiểu dữ liệu: String, Number, Boolean, Array, Object, Date, v.v.
- Tùy chỉnh thông báo lỗi: Có thể định nghĩa thông báo lỗi cụ thể cho từng quy tắc.
- Tích hợp tốt với Express: Dễ dàng sử dụng trong middleware để kiểm tra dữ liệu từ request.
- Hỗ trợ validate nâng cao: Bao gồm validate điều kiện, validate lồng nhau (nested objects), và validate mảng.
- Ví dụ cơ bản:
```js
import Joi from "joi"; // Import thư viện Joi để sử dụng cho việc validate

// Định nghĩa schema để validate dữ liệu
const schema = Joi.object({
    name: Joi.string().required().max(100), // Trường "name" phải là chuỗi, bắt buộc và tối đa 100 ký tự
    age: Joi.number().integer().min(0).max(120), // Trường "age" phải là số nguyên, từ 0 đến 120
});

// Dữ liệu cần kiểm tra
const data = { name: "Nguyễn Văn A", age: 25 };

// Thực hiện validate dữ liệu dựa trên schema
const { error, value } = schema.validate(data);

// Kiểm tra kết quả validate
if (error) {
    console.log("Dữ liệu không hợp lệ:", error.details); // Nếu có lỗi, in chi tiết lỗi ra console
} else {
    console.log("Dữ liệu hợp lệ:", value); // Nếu dữ liệu hợp lệ, in dữ liệu đã được validate
}
```
---
## 2. Thực hành
- Cấu trúc:
```
src/
├── controllers/
│   └── product.controller.js  # Xử lý logic CRUD cho sản phẩm
├── middlewares/
│   └── validateRequest.js     # Middleware validate dữ liệu đầu vào
├── routers/
│   └── product.router.js      # Định nghĩa các endpoint API cho sản phẩm
├── validation/
│   └── product.validation.js  # Định nghĩa schema validate bằng Joi
└── index.js                   # Tệp chính khởi chạy ứng dụng
```
### Validate: 

- Tạo thư mục `src/validation`
- Tạo file `product.validation.js` (schema Joi).
- Định nghĩa schema validate bằng Joi:
  + `createProductSchema`: Kiểm tra dữ liệu khi thêm sản phẩm mới.
  + `updateProductSchema`: Kế thừa từ `createProductSchema`, các trường không bắt buộc.
```js
import Joi from "joi";

// Schema tạo sản phẩm mới
export const createProductSchema = Joi.object({
    name: Joi.string().required().max(200).messages({
      "string.base": "Tên sản phẩm phải là chuỗi",
      "string.empty": "Tên sản phẩm không được để trống",
      "string.max": "Tên sản phẩm không được vượt quá {#limit} ký tự",
      "any.required": "Tên sản phẩm là bắt buộc",
    }),
    description: Joi.string().required().messages({
      "string.base": "Mô tả sản phẩm phải là chuỗi",
    }),
    price: Joi.number().required().min(0).messages({
      "number.base": "Giá sản phẩm phải là số",
      "number.min": "Giá sản phẩm không được âm",
      "any.required": "Giá sản phẩm là bắt buộc",
    }),
    category: Joi.string().required().messages({
        "string.base": "ID danh mục phải là chuỗi",
        "string.empty": "ID danh mục không được để trống",
        "any.required": "Danh mục sản phẩm là bắt buộc",
    }),
    // ...các trường khác...
});

// Schema cập nhật sản phẩm
export const updateProductSchema = createProductSchema.fork(
  ["name", "description", "price"],
  (schema) => schema.optional()
);
```

### Middleware:
- Middleware validateRequest kiểm tra dữ liệu từ req.body, req.params, hoặc req.query.
- Tạo thư mục `src/middlewares`
- Tạo file `validateRequest.js` và định nghĩa.

```js
import Joi from "joi";

export const validateRequest = (schema, target = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[target], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        error: "Dữ liệu không hợp lệ",
        details: error.details.map((err) => err.message),
      });
    }

    req[target] = value;
    next();
  };
};
```

- Tích hợp `middleware` vào `router`
- Sử dụng `validateRequest` trong `products.router.js`:
+ `POST` `/products`: Dùng `createProductSchema`.
+ `PUT` `/products/:id`: Dùng `updateProductSchema`.

```js
import express from "express";
import { validateRequest } from "../middleware/validateRequest";
import { createProductSchema, updateProductSchema } from "../validation/product.validation";
import { createProduct, updateProduct } from "../controllers/product.controller";

const router = express.Router();

// Route thêm sản phẩm mới
router.post("/products", validateRequest(createProductSchema), createProduct);

// Route cập nhật sản phẩm
router.put("/products/:id", validateRequest(updateProductSchema), updateProduct);

export default router;
```
- Dùng Postman kiểm tra các endpoint với dữ liệu hợp lệ và không hợp lệ.
