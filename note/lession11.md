# Truy vấn nâng cao với Mongoose

Truy vấn nâng cao với Mongoose cho phép bạn thực hiện các thao tác phức tạp trên cơ sở dữ liệu MongoDB như lọc dữ liệu nâng cao, phân trang, sắp xếp, join bảng (populate), tìm kiếm toàn văn (full-text search), thống kê với aggregation, v.v.

---
# Truy vấn cơ bản:
- Tìm tất cả bản ghi: `User.find()`;
- Tìm theo điều kiện: `User.find({ name: "Minh" })` hoặc `User.find({ age: 25 })`;
- Tìm 1 bản ghi duy nhất: `User.findOne({ email: "abc@example.com" })`;
- Tìm theo ID: `User.findById("664f1f7d8f1a2c6cf8a0b19b")`;
- Thêm mới bản ghi: `User.create({name: "Nam", age: 30})` hoặc 
```js
const newUser = new User({
  name: "Nam",
  age: 22,
  email: "nam@example.com",
  isActive: true
});

await newUser.save();
```
- Cập nhật bản ghi: `User.findByIdAndUpdate(id,data)` hoặc `User.updateOne()` hoặc `User.findOneAndUpdate()`
- Xóa bản ghi: `User.deleteOne({ email: "nam@example.com" })` hoặc `User.findByIdAndDelete(id);`

---
# Truy vấn nâng cao:

## Lọc dữ liệu với toán tử so sánh

- Các toán tử:
```
| Toán tử Mongoose | Ý nghĩa                    |
| ---------------- | -------------------------- |
| `$gt`            | Greater than (>)           |
| `$gte`           | Greater than or equal (>=) |
| `$lt`            | Less than (<)              |
| `$lte`           | Less than or equal (<=)    |
| `$ne`            | Not equal                  |
| `$in`            | Trong danh sách            |
| `$nin`           | Không trong danh sách      |
```

- Ví dụ:

```js
// Tìm user có tuổi > 18
User.find({ age: { $gt: 18 } })

// Tuổi nằm trong 18, 20, 22
User.find({ age: { $in: [18, 20, 22] } })

// Không phải là active
User.find({ isActive: { $ne: true } })
```

## Tìm kiếm
```js
// Tìm user có tên chính xác là "Nguyễn Văn A"
User.find({ name: "Nguyễn Văn A" });

// Tìm user có tên chứa từ "nguyen" (không phân biệt hoa thường)
User.find({ name: { $regex: "nguyen", $options: "i" } });

// Tìm user có tên bắt đầu bằng "Lê"
User.find({ name: { $regex: "^Lê", $options: "i" } });

// Tìm user có tên kết thúc bằng "An"
User.find({ name: { $regex: "An$", $options: "i" } });

// Regex động
const keyword = "minh";
const regex = new RegExp(keyword, "i"); // không phân biệt hoa thường
User.find({ name: regex });

// Tìm kiếm nhiều trường
const keyword = "abc";
const regex = new RegExp(keyword, "i");

User.find({
  $or: [
    { name: regex },
    { email: regex }
  ]
});
```

## Tìm kiếm với nhiều điều kiện
- Các toán tử phổ biến:
```
| Toán tử Điều kiện | Ý nghĩa                    |
| ----------------- | -------------------------- |
| `$and`            | Và (Tất cả ĐK phải đúng)   |
| `$or`             | Hoặc (Chỉ cần đúng 1 ĐK)   |
| `$nor`            | Không thỏa mãn ĐK nào      |
| `$not`            | Phủ định ĐK                |
```

- Ví dụ:
```js
// Tất cả điều kiện phải đúng (and)
User.find({ $and: [{ age: { $gt: 18 } }, { isActive: true }] })

// Một trong hai đúng (or)
User.find({ $or: [{ name: "John" }, { email: "example@gmail.com" }] })

// Không thỏa mãn bất kỳ điều kiện nào (nor)
User.find({ $nor: [{ name: "John" }, { age: { $lt: 18 } }] })

// Phủ định điều kiện
User.find({ age: { $not: { $gt: 30 } } })
```

## Sắp xếp
```js
// Sắp xếp theo tuổi tăng dần
User.find().sort({ age: 1 })

// Sắp xếp theo ngày tạo giảm dần
User.find().sort({ createdAt: -1 })
```

## Phân trang

### Phân trang bằng skip và limit
```js
// Lấy 10 user đầu tiên
User.find().limit(10)

// Bỏ qua 10 user đầu tiên, lấy 10 tiếp theo (trang 2)
const page = 2; // Trang
const limit = 10; // Số lượng bản ghi 1 trang
const skip = (page - 1) * perPage; // Số lượng phần tử bỏ qua

User.find().skip(skip).limit(limit);
```

### Phân trang bằng `mongoose-paginate-v2`

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

## Đếm số lượng bản ghi

```js
User.countDocuments({ isActive: true })
```

## Chọn trường trả về
- Cách 1: 
```js
// Lấy tên và email, ẩn _id
User.find({}, { name: 1, email: 1, _id: 0 });
```

- Cách 2:
```js
// Chỉ lấy name và email
User.find().select("name email")

// Ẩn trường _id
User.find().select("name email -_id")
```