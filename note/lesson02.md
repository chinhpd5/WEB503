# Router trong NodeJS

Mục tiêu bài học:
- Hiểu khái niệm `Router` trong `ExpressJS`
- Phân biệt `Router` và `Controller`
- Sử dụng `Router` để tổ chức và quản lý các route hiệu quả
- Áp dụng `Router` trong mô hình `MVC` khi xây dựng `RESTful API`

## 1. Router là gì?
Trong `ExpressJS`, `Router` là một đối tượng cho phép:
Định nghĩa, nhóm và quản lý các tuyến đường (route) của ứng dụng.

`Router` giúp tách riêng phần định tuyến `URL` ra khỏi logic xử lý, từ đó làm cho mã nguồn:
- Rõ ràng
- Dễ bảo trì
- Dễ mở rộng

## 2. Vai trò của Router trong ứng dụng ExpressJS
Router chịu trách nhiệm:
- Lắng nghe các `HTTP` request (`GET`, `POST`, `PUT`, `DELETE`,…)
- Xác định `URL` và `HTTP Method`
- Chuyển request đến Controller tương ứng
>`Router` không xử lý logic nghiệp vụ, mà chỉ đóng vai trò điều hướng.

## 3. Router trong kiến trúc MVC
Trong mô hình `MVC` áp dụng cho `ExpressJS`:
```
Client → Router → Controller → Model → Controller → Response
```

1. `Client` gửi `request` đến `server`
2. `Express` kiểm tra các `Router` đã khai báo
3. `Router` khớp `URL` + `Method`
4. Gọi `controller` tương ứng
5. Sử dụng `Model` để thao tác với dữ liệu nếu có
6. `Controller` trả `response`

## 4. Quy tắc đặt Router trong Rest

### 4.1. Đặt theo tài nguyên (Resource-based)
- `Router` đại diện cho một loại tài nguyên
- Dùng danh từ số nhiều
- Viết chữ thường

```
/users
/products
/orders
/categories
```

Sai: `/user`, `/getUsers`, `/productList`

### 4.2. Mỗi Router = một module chức năng
| Router         | Chức năng          |
| -------------- | ------------------ |
| usersRouter    | Quản lý người dùng |
| productsRouter | Quản lý sản phẩm   |
| ordersRouter   | Quản lý đơn hàng   |

> Không gộp nhiều chức năng vào một router

## 5. Quy tắc đặt tên cho Route trong Rest

### 5.1. Không dùng động từ trong URL
Sai
```
/getUsers
/createUser
/deleteProduct
```

Đúng
```
/users
/users/:id
/products/:id
```
> Hành động thể hiện bằng HTTP Method

### 5.2. Dùng đúng HTTP Method cho CRUD
| Hành động     | Method      | Route      |
| ------------- | ----------- | ---------- |
| Lấy danh sách | GET         | /users     |
| Lấy chi tiết  | GET         | /users/:id |
| Tạo mới       | POST        | /users     |
| Cập nhật      | PUT / PATCH | /users/:id |
| Xóa           | DELETE      | /users/:id |

### 5.3. Sử dụng :id cho tài nguyên cụ thể
```
/users/:id
/products/:id
```
> Không lồng logic vào URL `/users/delete/5`
> Đúng `DELETE /users/5`

### 5.4. Khi có quan hệ cha – con
Ví dụ: Lấy chi tiết User có nhiều Order
```
/users/:userId/orders
``` 

## 6. Quy tắc đặt tiền tố API (Prefix)
### 6.1. Dùng /api
```js
app.use("/api/users", usersRouter);
```

### 6.2. Versioning API (khuyến nghị)
```
/api/v1/users
/api/v2/users
```

## 7. Quy tắc đặt tên file Router
| Tên file          | Nội dung         |
| ----------------- | ---------------- |
| user.routes.js    | Route người dùng |
| product.routes.js | Route sản phẩm   |
| order.routes.js   | Route đơn hàng   |
