# MVC là gì và Controller trong ExpressJS

Mục tiêu buổi học:
- Hiểu được mô hình kiến trúc `MVC`
- Nắm được vai trò và cách xây dựng `Controller` trong mô hình `MVC`
- Request - Response  
- Hiểu và sử dụng `HTTP Status Code` khi xử lý `request` trong `Controller`

## 1. Mô hình MVC
### 1.1. Định nghĩa
- `MVC` (Model – View – Controller) là mô hình kiến trúc phần mềm giúp tổ chức mã nguồn một cách rõ ràng, dễ bảo trì và mở rộng.

- Trong `ExpressJS`, `MVC` thường được áp dụng để xây dựng các ứng dụng web và `RESTful API`.

`MVC` giúp tách biệt trách nhiệm giữa các thành phần trong hệ thống.

### 1.2. Các thành phần trong MVC
#### 1.2.1. Model
- Quản lý dữ liệu
- Tương tác với cơ sở dữ liệu (CRUD)
- Chứa các logic liên quan đến dữ liệu

#### 1.2.2. View (nếu có)
- Chịu trách nhiệm hiển thị giao diện người dùng
- Thường sử dụng các `template engine` như: `Pug`, `EJS`, ``Handlebars``…
> Trong các ứng dụng `RESTful API`, `View` không được sử dụng, thay vào đó `server` trả về `JSON`

#### 1.2.3. Controller
- Xử lý logic nghiệp vụ
- Nhận `request` từ cl`ient
- Điều phối dữ liệu giữa `Model` và `View` (hoặc trả `JSON`)

#### 1.2.4. Route (không phải thành phần chính thức của MVC)
- Định tuyến các `request HTTP`
- Chuyển `request` đến `controller` tương ứng

## 2. Controller trong ExpressJS
### 2.1. Controller là gì?
Trong `NodeJS` (đặc biệt khi sử dụng ExpressJS), `Controller` là thành phần trung tâm của kiến trúc `MVC`, chịu trách nhiệm Xử lý yêu cầu từ client và trả về phản hồi phù hợp.

### 2.2. Vai trò của Controller
Controller đảm nhận các chức năng chính sau:
- Nhận `request` từ `client` thông qua `router`
- Gọi các hàm xử lý dữ liệu từ `Model`
- Thực hiện xử lý logic nghiệp vụ
- Trả `response` về cho `client` (JSON, status code, message,…)
> `Controller` không trực tiếp thao tác với database, mà thông qua Model.

## 3. Request và Response là gì?
Trong `ExpressJS`, mỗi `HTTP` `request` được xử lý thông qua 2 đối tượng chính:
- `Request` (req): đại diện cho yêu cầu mà client gửi lên server
- `Response` (res): đại diện cho phản hồi mà server trả về client
> `Controller` chính là nơi nhận `req` và tạo `res`.

## 4. Request (req) trong Controller
### 4.1 Định nghĩa
`Request` chứa toàn bộ thông tin mà `client` gửi lên, bao gồm:
- URL
- HTTP Method
- Headers
- Dữ liệu gửi kèm (params, query, body)

### 4.2. Các thành phần quan trọng của Request
#### 4.2.1. req.params – Route Parameters
Dùng để lấy dữ liệu động từ URL.
```js
GET /users/5
req.params.id //5
```

#### 4.2.2. req.query – Query String
Dùng cho tìm kiếm, lọc, phân trang.
```js
GET /users?page=1&limit=10
req.query.page
req.query.limit
```

#### 4.2.3. req.body – Dữ liệu gửi từ client
Chứa dữ liệu được gửi lên thông qua:
- POST
- PUT
- PATCH
```
req.body.email
req.body.password
```
> Cần `middleware` `express.json()` để đọc được body `JSON`

#### 4.2.4. req.headers
Chứa thông tin metadata của request:
- Authorization
- Content-Type
- Token

## 5. Response (res) trong Controller
### 5.1. Định nghĩa
Response là đối tượng được dùng để gửi kết quả xử lý từ server về client.
Response thường bao gồm:
- HTTP Status Code
- Dữ liệu (JSON)
- Message

### 5.2. Các phương thức Response thường dùng
#### 5.2.1. res.status(code) - HTTP Status Code trong Controller - 
`HTTP Status Code` là các mã số gồm 3 chữ số, được `server` trả về để thông báo cho `client` biết kết quả xử lý của một yêu cầu `HTTP`. `res.status(code)`
Việc sử dụng đúng status code giúp:
- Chuẩn hóa giao tiếp client – server
- Dễ debug và xử lý lỗi
- Xây dựng API chuyên nghiệp

#### 5.2.2. Phân loại HTTP Status Code
| Nhóm    | Ý nghĩa                                     | Dải mã  |
| ------- | ------------------------------------------- | ------- |
| **1xx** | Thông tin – Request đang được xử lý         | 100–199 |
| **2xx** | Thành công – Request được xử lý thành công  | 200–299 |
| **3xx** | Chuyển hướng – Cần thực hiện thêm hành động | 300–399 |
| **4xx** | Lỗi từ phía client                          | 400–499 |
| **5xx** | Lỗi từ phía server                          | 500–599 |

#### 5.2.3. Một số HTTP Status Code thường dùng trong RESTful API
| Mã      | Ý nghĩa               | Mô tả                                 |
| ------- | --------------------- | ------------------------------------- |
| **200** | OK                    | Request thành công                    |
| **201** | Created               | Tạo mới tài nguyên thành công         |
| **204** | No Content            | Thành công nhưng không trả về dữ liệu |
| **400** | Bad Request           | Dữ liệu gửi lên không hợp lệ          |
| **401** | Unauthorized          | Chưa xác thực                         |
| **403** | Forbidden             | Không có quyền truy cập               |
| **404** | Not Found             | Không tìm thấy tài nguyên             |
| **409** | Conflict              | Xung đột dữ liệu                      |
| **422** | Unprocessable Entity  | Dữ liệu đúng cú pháp nhưng sai logic  |
| **500** | Internal Server Error | Lỗi hệ thống phía server              |

#### 5.2.4. res.json(data)
Trả dữ liệu dạng `JSON` (chuẩn RESTful API).
```js
res.json({ message: "Success" });
```

#### 5.2.5. res.send(data)
Gửi response (text, JSON, HTML).
```js
res.send("OK");
```

### 5.3 Kết hợp status và json
```js
res.status(201).json({
  ok: true,
  data: products,
  message: "successfully"
});

res.status(401).json({
  ok: false,
  message: "errors ..."
});
```