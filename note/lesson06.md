# Middleware là gì? Sử dụng Middleware để validate

Mục tiêu bài học:
- Tìm hiểu cơ bản `Middleware` 
- Cách sử dụng `Middleware`
- Tìm hiểu `Middleware` `Joi` để validate dữ liệu

## 1. Middleware là gì?
`Middleware` là các hàm trung gian nằm giữa:
```js
Request (Client) → Route  và Controller → Response
```
> Can thiệp vào `request`
> Xử lý `logic` trung gian
> Quyết định cho `request` đi tiếp hay dừng lại
> Trong `ExpressJS`, mọi `request` đều đi qua `middleware` trước khi đến `controller`.

## 2. Vị trí của Middleware trong luồng xử lý
```js
Client
  ↓
Middleware 1
  ↓
Middleware 2
  ↓
Route
  ↓
Middleware 3
  ↓
Middleware 4
  ↓
Controller
  ↓
Response
```

## 3. Cú pháp Middleware trong ExpressJS
```js
const middlewareName = (req, res, next) => {
  // xử lý logic
  next(); // cho phép đi tiếp
};
```