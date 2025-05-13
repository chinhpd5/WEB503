# Buổi 1: Giới thiệu NodeJS và cài đặt dự án NodeJS

## NodeJS là gì?
- Node.js là một nền tảng chạy JavaScript phía server, được xây dựng trên V8 JavaScript engine của Google Chrome. 
- Khác với JavaScript truyền thống chỉ chạy trên trình duyệt
- Node.js cho phép bạn chạy JavaScript trên máy chủ (server), từ đó bạn có thể xây dựng các ứng dụng như (Web server, API backend, Ứng dụng real-time, Hệ thống xử lý file, thao tác với database)
- Docs: https://nodejs.org/en
- Link cài đặt: https://nodejs.org/en/download

---
## Cài đặt dự án NodeJS

- Tạo thư mục `WEB503`
- Mở terminal, khởi tạo dự án:
```bash
  npm init -y
```
- Cài đặt thư viện express.js
```bash
  npm i express
```
  + ExpressJs là framework dành cho NodeJS để xây dựng các ứng dụng web và RESTful API.
  + Docs ExpressJS: https://expressjs.com/
- Cài đặt Babel cho dự án:
```bash
  npm i -D @babel/core @babel/node @babel/preset-env nodemon
```
  + Babel hỗ trợ quá trình code trên môi trường dev
  + Tạo file `.babelrc` và thêm nội dung:
  ```json
  {
    "presets": ["@babel/preset-env"]
  }
  ```
- Cấu hình `package.json`, thêm scripts:
```json
"scripts": {
  "dev": "nodemon --exec babel-node src/app.js"
}
```
- Tạo file `index.js`, và thêm nội dung:
```js
import express from 'express'

const app = express();


app.listen(3000, () => {
    console.log(`Server is running on port http://localhost:3000`);
});
```









