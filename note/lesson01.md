# Cài đặt dự án Backend với NodeJS
Mục tiêu:
- Cài đặt và chạy dự án backend
- Hiểu các thư viện sử dụng trong dự án
- Hiểu các thành phần, cấu trúc dự án cơ bản

---
## Cài đặt NodeJS
- Link cài đặt: https://nodejs.org/en/download
- Kiểm tra, mở `Command Prompt`:
```bash
node -v
```

---
## Các bước tạo dự án
1. Tạo thư mục `WEB503`
> Tên dự án, nơi chứa toàn bộ mã nguồn của dự án

2. Mở dự án trong `VSC`, bật `terminal` hoặc mở `Command Prompt` tại đường dẫn dự án.
Ví dụ:
```
D:\WEB503>
```

3. Khởi tạo dự án:
```bash
npm init -y
```
> - `npm`: (Node Package Manager) là trình quản lý thư viện cho `NodeJS`.
> - `npm init`: dùng để khởi tạo một project `NodeJS` mới.
> - `-y`: `yes to all` – chấp nhận tất cả cấu hình mặc định, không nhất thiết phải có `-y`
> - `npm` sẽ tạo 1 `file` `package.json` chứa thông tin của dự án (tên dự án, phiên bản, script, thư viện, cấu hình liên quan,...)

4. Cài đặt thư viện `express.js`
```bash
npm install express
```
> `ExpressJs` là `framework` dành cho `NodeJS` để xây dựng các ứng dụng web và `RESTful API` nhanh chóng, gọn nhẹ và hiệu quả.
> `ExpressJS` không thay thế `NodeJS`, mà chạy trên `NodeJS`.
> Docs `ExpressJS`: https://expressjs.com/

5. Cài đặt 1 số thư viện bổ sung:
- Cài đặt `Babel` cho dự án:
```bash
npm i -D @babel/core @babel/node @babel/preset-env nodemon
```
> `Babel` hỗ trợ quá trình `code` trên môi trường `dev`

- Tạo file `.babelrc` và thêm nội dung:
```json
{
  "presets": ["@babel/preset-env"]
}
```

- Cấu hình `package.json`, thêm `scripts`:
```json
"scripts": {
  "dev": "nodemon --exec babel-node src/app.js"
}
```

- Tạo file `src/app.js`, và thêm nội dung:
```js
import express from 'express'

const app = express();

app.listen(3000, () => {
    console.log(`Server is running on port http://localhost:3000`);
});
```