# NodeJS & Restful Web Service

Mục tiêu môn học:
- Hiểu bản chất của `NodeJS`
- Nắm được kiến trúc `REST` và các nguyên tắc thiết kế `RESTful` `API`
- Tổ chức cấu trúc dự án `backend`
- Hiểu cách kết nối và làm việc với CSDL `(MongoDB)`
- `Request` – `Response`
- `Middleware`: Xác thực, phân quyền và `validation`

---
## NodeJS là gì?
### Định nghĩa
`NodeJS` là một môi trường chạy `JavaScript` phía `server`, được xây dựng trên `V8 JavaScript Engine` của `Google Chrome`.

> Trước đây `JavaScript` chỉ chạy trong trình duyệt.
> `NodeJS` cho phép chạy `JavaScript` trên máy chủ.

### Đặc điểm cốt lõi của NodeJS
| Đặc điểm            | Giải thích                                 |
| ------------------- | ------------------------------------------ |
| Runtime environment | Không phải ngôn ngữ, mà là môi trường chạy |
| Event-driven        | Hoạt động dựa trên sự kiện                 |
| Non-blocking I/O    | Không chờ xử lý xong mới làm việc khác     |
| Single-thread       | 1 luồng chính, xử lý nhiều request         |
| High performance    | Rất nhanh với ứng dụng nhiều request       |

### NodeJS dùng để làm gì?
- Xây dựng `Web Server`
- Xây dựng `RESTful API`
- Xây dựng `backend` (Website, Mobile App, SPA (React, Angular, Vue))
- Ứng dụng `real-time` (Chat, Notification, Game online,... )

---
## RESTful Web Service là gì?

### Web Service là gì?
`Web Service` là dịch vụ cho phép các hệ thống giao tiếp với nhau qua mạng (thường là Internet).

### REST là gì?
`REST (Representational State Transfer)` là một kiến trúc thiết kế `Web Service`, do `Roy Fielding` đề xuất.

> RESTful Web Service = Web Service được thiết kế theo chuẩn REST.

### Tại sao cần sử dụng RESTful
#### Cách làm truyền thống (Server render)
1. Backend:
- Xử lý logic
- Truy vấn `CSDL`
- Render `HTML`

2. Client chỉ nhận `HTML`

#### Hạn chế
- `Mobile App` không dùng được
- `Frontend` bị phụ thuộc `backend`
- Khó mở rộng, khó bảo trì
- Không phù hợp `SPA` (React, Angular, Vue)

#### RESTful API ra đời để giải quyết vấn đề gì?
`RESTful API` tách biệt `frontend` và `backend`
```
Frontend (Web / Mobile / Desktop)
        ↓ HTTP (JSON)
Backend (RESTful API)
        ↓
Database
```
> `Backend` chỉ cung cấp dữ liệu, không quan tâm giao diện.

### Nguyên tắc của REST
| Nguyên tắc        | Ý nghĩa                            |
| ----------------- | ---------------------------------- |
| Client – Server   | FE và BE tách biệt                 |
| Stateless         | Server không lưu trạng thái client |
| Resource-based    | Mọi thứ là tài nguyên              |
| Uniform Interface | Giao diện thống nhất               |
| Cacheable         | Có thể cache                       |
| Layered System    | Có thể qua nhiều tầng              |

### Resource trong REST
Ví dụ:
- /users
- /products
- /orders/123

> Mỗi `URL` đại diện cho một tài nguyên

### HTTP Methods trong REST
| Method | Ý nghĩa           |
| ------ | ----------------- |
| GET    | Lấy dữ liệu       |
| POST   | Tạo mới           |
| PUT    | Cập nhật toàn bộ  |
| PATCH  | Cập nhật một phần |
| DELETE | Xóa               |

```js
GET    /api/users        → Lấy danh sách user
GET    /api/users/1      → Lấy user id = 1
POST   /api/users        → Thêm user
PUT    /api/users/1      → Sửa user
DELETE /api/users/1      → Xóa user
```

### Status Code trong REST
`HTTP Status Code` là mã số do `server` trả về để cho `client` biết kết quả xử lý `request`.

#### Phân loại Status Code (theo nhóm)
| Nhóm | Ý nghĩa         |
| ---- | --------------- |
| 1xx  | Thông tin       |
| 2xx  | Thành công      |
| 3xx  | Chuyển hướng    |
| 4xx  | Lỗi phía client |
| 5xx  | Lỗi phía server |
