import User from '../models/user.model'
import bcrypt from 'bcryptjs';

export const register = async (req,res) =>{
  try {
    // Kiểm tra tài khoản đã tồn tại
    const userExist = await User.findOne({email: req.body.email});
    if(userExist){
      return res.status(400).json({message: `Đã tồn tại ${req.body.email}, vui lòng đổi email khác`})
    }

    // Mã hóa mật khẩu
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword

    // Lưu trữ 
    const user = await User.create(req.body)
    user.password = undefined;

    return res.status(201).json({
      message: "Đăng ký thành công",
      data: user
    })
    
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
}