# LAB

- Tạo model `post` có các trường thông tin sau:
```js
title: string, required, minlength = 10
views: number, required, min = 0
author: string, required
content: string, required
isPublish: boolean, default = true

```

- Tạo `routers`, `controllers` làm việc với model `post`, sử dụng `joi` để validate theo yêu cầu

- Các endpoint tại cần thực hiện trong router:
1. **GET /posts**  
  Trả về danh sách tất cả bài viết.

2. **GET /posts/:id**  
  Trả về chi tiết bài viết theo `id`. Trả về 404 nếu không tìm thấy.

3. **POST /posts**  
  Thêm bài viết mới. Dữ liệu gửi lên từ client qua `req.body`.

4. **PUT /posts/:id**  
  Cập nhật bài viết theo `id`. Trả về 404 nếu không tìm thấy.

5. **DELETE /posts/:id**  
  Xóa bài viết theo `id`. Trả về 404 nếu không tìm thấy.

- Kiểm thử tại Postman