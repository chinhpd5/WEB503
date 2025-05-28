import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true // loại bỏ khoảng trắng dư thừa
  },
  email: {
    type: String,
    required: true,
    unique: true, // chỉ cho phép tồn tại 1 bản ghi có giá trị duy nhất
    match:[/^\S+@\S+\.\S+$/ , "Sai định dạng email"]
  },
  password: {
    type: String,
    required: true,
    min: 6,
    select: false // Không trả về password trong query
  },
  role: {
    type: String,
    enum: ["customer", "staff", "admin"],
    default: "customer",
  },
  phone: {
    type: String,
    validate: {
      validator: (value) => /^\d{10}$/.test(value),
      message: (props) => `${props.value} không phải là số điện thoại hợp lệ!`,
    },
  },
  addresses: [
    {
      street: String,
      city: String,
      isDefault: {
        type: Boolean,
        default: false,
      },
    },
  ],
  active: {
    type: Boolean,
    default: true
  },
},{
  timestamps: true,
  versionKey: false
})

const User = mongoose.model('User',userSchema);

export default User;