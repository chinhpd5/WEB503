# Các mối quan hệ trong MongoDB

Trong `MongoDB` (một cơ sở dữ liệu NoSQL dạng tài liệu), các mối quan hệ không được định nghĩa rõ ràng như trong cơ sở dữ liệu quan hệ (`RDBMS` - Relational Database Management System), nhưng bạn vẫn có thể mô hình hóa các quan hệ giữa các tài liệu theo ba loại chính:
- Quan hệ 1-1
- Quan hệ 1-n
- Quan hệ n-n

---
## 1. One-to-One (1-1) – Quan hệ một-một
Ví dụ: Một người dùng chỉ có một hồ sơ cá nhân
Các mô hình hóa:
- Reference (tham chiếu):
```js
// Model Profile
const frofileSchema = new mongoose.Schema({
  age: Number,
  address: String
})

// Model User
const userSchema = new mongoose.Schema({
  username: String
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  },
})
```

db:
```json
// Collection: users
{
  "_id": ObjectId("..."),
  "username": "chinhpd5",
  "profileId": ObjectId("...")
}

// Collection: profiles
{
  "_id": ObjectId("..."),
  "age": 25,
  "address": "Hanoi"
}
```

- Embedded Document (nhúng):
```js
// Model: User
const userSchema = new mongoose.Schema({
  username: String
  profile: {
    age: Number
    address: String,
  },
})
```
db:
```json
// Collection: users
{
  "_id": ObjectId("..."),
  "username": "chinhpd5",
  "profile": {
    "age": 25,
    "address": "Hanoi"
  }
}
```
