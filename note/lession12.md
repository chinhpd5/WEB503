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
const profileSchema = new mongoose.Schema({
  age: Number,
  address: String
})

// Model User
const userSchema = new mongoose.Schema({
  username: String
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }
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
### Khi nào nên nhúng
Số lượng không quá lớn.
Các Phần tử thường không được truy vấn độc lập.

---
## 2. One-to-Many - Quan hệ một - nhiều
Ví dụ: Một bài viết có nhiều bình luận.
Các mô hình hóa:
- Reference (tham chiếu):
```js
// Model Post
const postSchema = new mongoose.Schema({
  title: String,
  content: String
})

// Model Comment
const commentSchema = new mongoose.Schema({
  user: String
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  content: String
})
```
db:
```json
// Collection: posts
{
  "_id": ObjectId("..."),
  "title": "Post Title"
}

// Collection: comments
[
  {
    "_id": ObjectId("..."),
    "postId": ObjectId("..."),
    "user": "Alice",
    "content": "Great post!"
  },
  {
    "_id": ObjectId("..."),
    "postId": ObjectId("..."),
    "user": "chinhpd5",
    "content": "Nice post!"
  },

]
```
- Embedded Document (nhúng):
```js
// Model Profile
// Cách 1:
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  comment: [
    { user: String, content: String }
  ]
})

// Cách 2:
// Model Post
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  comment: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
})

// Model Comment
const commentSchema = new mongoose.Schema({
  user: String
  content: String
})
```
db: 
```json
{
  "_id": ObjectId("..."),
  "title": "Post Title",
  "comments": [
    { "user": "Alice", "content": "Great post!" },
    { "user": "Chinhpd5", "content": "Nice post!" }
  ]
}
```

## 3. Many-to-Many
Ví dụ: Đơn hàng - Sản phẩm và Giỏ hàng - sản phẩm.
Các mô hình hóa:
- Reference (tham chiếu): Đơn hàng - Chi tiết sản phẩm - Sản phẩm
```js
// Model Order
const orderSchema = new mongoose.Schema({
  user: String,
  status: Number,
  order_date: DateTime,
  total: Number
})

// Model Product
const productSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number 
})

// Model OrderDetail
const orderDetailSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  productId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  price: Number,
  quantity: Number
})
```

- Embedded Document (nhúng): Đơn hàng - Chi tiết sản phẩm - Sản phẩm
```js
// Model Cart
const cartSchema = new mongoose.Schema({
  user: String,
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: Number,
      selected: Boolean
    }
  ]
})

// Model Product
const productSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number 
})
```

```json
// Collection: carts
{
  "_id": ObjectId("..."),
  "user": "chinhpd5",
  "items": [
    {
      "productId": ObjectId("..."),
      "quantity": 2,
      "price": 150000,
      "selected": true
    },
    {
      "productId": ObjectId("..."),
      "quantity": 1,
      "price": 350000,
      "selected": false
    }
  ]
}
```