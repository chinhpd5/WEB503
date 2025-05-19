# Lab
- Tạo controller và router cho post
- Thêm mảng `posts` tại controller:
```js
  const posts = [
    { id: 1, title: "Bài viết 1", views: 100, content: "Nội dung bài viết 1" },
    { id: 2, title: "Bài viết 2", views: 200, content: "Nội dung bài viết 2" },
    { id: 3, title: "Bài viết 3", views: 300, content: "Nội dung bài viết 3" }
  ];
```
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
