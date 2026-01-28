import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req,res) => {
  try {
    const data = req.body;

    // kiểm tra email có tồn tại không
    const existUser = await User.findOne({email: data.email});
    if(existUser){
      return res.status(401).json({
        isSuccess: false,
        message: "Đã tồn tại email, vui lòng đổi email khác"
      })
    }

    // Mã hóa mật khẩu
    const hashPassword = await bcrypt.hash(data.password, 10);
    // gán mật khẩu đã mã hóa sang data
    data.password = hashPassword

    // Lưu data và User
    const user = await User.create(data);
    // Ẩn password
    user.password = undefined;

    return res.status(201).json({
      isSuccess: true,
      message: "Đăng ký thành công",
      data: user
    })

  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error
    })
  }
}

export const login = async (req, res) => {
  try {
    const data = req.body;

    const existUser = await User.findOne({email: data.email});
    if(!existUser){
      return res.status(401).json({
        isSuccess: false,
        message: "Sai tài khoản, vui lòng thử tài khoản khác"
      })
    }

    const isMatch = await bcrypt.compare(data.password, existUser.password);
    if(!isMatch){
      return res.status(401).json({
        isSuccess: false,
        message: "Sai mật khẩu, Vui lòng kiểm tra lại mật khẩu"
      })
    }

    const token = jwt.sign(
      {userId: existUser.id, name: existUser.name, role: existUser.role},
      process.env.KEY_SECRET,
      {expiresIn: '1h'}
    )
    // console.log(token);

    existUser.password = undefined;
    
    return res.status(200).json({
      isSuccess: true,
      message: "Đăng nhập thành công",
      data: {
        token,
        user: existUser
      }
    })
    

  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message
    })
  }
}