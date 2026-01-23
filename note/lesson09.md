# Truy vấn cơ bản và nâng cao trong Mongoose

## Các thao tác truy vấn cơ bản
### 1. Tìm tất cả tài liệu – find()
```js
Model.find();
```

Ví dụ:
```js
Product.find(); // Lấy tất cả sản phẩm
```

### 2. Tìm 1 tài liệu đầu tiên phù hợp điều kiện – findOne()
```js
Model.findOne({ điều_kiện });
```

Ví dụ
```js
Product.findOne({ name: "iPhone 15" });
```

### 3. Tìm theo ID – findById()
```js
Model.findById("id");
```

Ví dụ:
```js
Product.findById("65ae0d4e1a23527fc89123ab");
```

### 4. Thêm mới dữ liệu – create() hoặc new + save()
```js
const newProduct = new Product({ name: "Laptop", price: 1000 });
await newProduct.save();
```

Hoặc ngắn hơn:
```js
await Product.create({ name: "Laptop", price: 1000 });
```

### 5. Cập nhật dữ liệu – updateOne() / updateMany() / findByIdAndUpdate()
```js
await Product.updateOne({ _id: id }, { price: 1200 });
```

```js
await Product.findByIdAndUpdate(id, { price: 1200 }, { new: true });
```

```js
User.updateMany(
  { age: 18 }, // điều kiện cập nhật
  { age: 19 }); // nội dung cập nhật
```

### 6. Xóa dữ liệu – deleteOne() / deleteMany() / findByIdAndDelete()
```js
await Product.deleteOne({ _id: id });
```

```js
await Product.findByIdAndDelete(id);
```

```js
User.deleteMany({ age: 18 });
```

## Truy vấn nâng cao
### 1. Truy vấn bằng và gần bằng
| Toán tử         | Ý nghĩa                            |
| --------------- | ---------------------------------- |
| `$regex`        | Tìm chuỗi theo biểu thức chính quy |
| `$options: "i"` | Không phân biệt hoa thường         |

```js
// Tìm user có tên chính xác là "Nguyễn Văn A"
User.find({ name: "Nguyễn Văn A" });

// Tìm user có tên chứa từ "nguyen" (không phân biệt hoa thường)
User.find({ name: { $regex: "nguyen", $options: "i" } });

// Tìm user có tên bắt đầu bằng "Lê"
User.find({ name: { $regex: "^Lê", $options: "i" } });

// Tìm user có tên kết thúc bằng "An"
User.find({ name: { $regex: "An$", $options: "i" } });  
```   

### 2. Truy vấn theo điều kiện phức tạp (So sánh)
| Toán tử | Ý nghĩa           | Ví dụ                      |
| ------- | ----------------- | -------------------------- |
| `$gt`   | Lớn hơn           | `{ price: { $gt: 100 } }`  |
| `$gte`  | Lớn hơn hoặc bằng | `{ price: { $gte: 100 } }` |
| `$lt`   | Nhỏ hơn           | `{ price: { $lt: 500 } }`  |
| `$lte`  | Nhỏ hơn hoặc bằng | `{ price: { $lte: 500 } }` |
| `$ne`   | Khác              | `{ quantity: { $ne: 0 } }` |

Ví dụ:
```js
Product.find({
  price: { $gte: 100, $lte: 500 }
});
```
### 3. Truy vấn tổ hợp (Logic)
| Toán tử | Ý nghĩa                      |
| ------- | ---------------------------- |
| `$or`   | Một trong các điều kiện đúng |
| `$and`  | Tất cả điều kiện đúng        |
| `$nor`  | Tất cả điều kiện đều sai     |
| `$not`  | Phủ định                     |

Ví dụ:
```js
Product.find({
  $or: [
    { category: "phone" },
    { price: { $lt: 300 } }
  ]
});
```

### 4. Truy vấn với danh sách giá trị
| Toán tử | Ý nghĩa                  |
| ------- | ------------------------ |
| `$in`   | Có trong danh sách       |
| `$nin`  | Không có trong danh sách |

Ví dụ:
```js
Product.find({
  category: { $in: ["phone", "laptop"] }
});
```

### 5. Sắp xếp, phân trang, chọn trường
- `sort()`: Sắp xếp tăng (1) hoặc giảm (-1)
- `skip()`: Bỏ qua N kết quả đầu
- `limit()`: Giới hạn số lượng kết quả
- `select()`: Chọn trường muốn lấy (hoặc bỏ)

```js
Product.find()
  .sort({ price: -1 })         // Sắp xếp giảm dần
  .skip(5)                     // Bỏ 5 sản phẩm đầu
  .limit(10)                   // Lấy 10 sản phẩm tiếp theo
  .select("name price -_id");  // Chỉ lấy name và price, ẩn _id
```

### 6. Truy vấn liên kết với populate

Ví dụ:
```js
Product.find().populate("userId");
```

### 7. Truy vấn nâng cao kết hợp nhiều điều kiện
```js
Product.find({
  $and: [
    { category: { $in: ["phone", "tablet"] } },
    { price: { $gte: 100, $lte: 1000 } },
    { name: { $regex: "Pro", $options: "i" } }
  ]
})
.sort({ price: 1 })
.limit(5)
.select("name price category");
```

### 8. Truy vấn nâng cao với .where()
```js
Product.where("price").gt(100).lt(1000).where("category").equals("phone");
```

## Sử dụng `mongoose-paginate-v2`

- Cài đặt: `npm install mongoose-paginate-v2`
- Tích hợp vào Schema
```js
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

userSchema.plugin(mongoosePaginate);

const User = mongoose.model('User', userSchema);
```
- Cách dùng:
```js
const options = {
  page: 1,        // Trang số
  limit: 10,      // Số bản ghi/trang
  sort: { name: 1 } // Sắp xếp tăng dần theo tên
};

User.paginate({}, options)
  .then(result => {
    console.log(result);
  });

```
