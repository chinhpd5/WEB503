import User from '../models/user.model'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

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

export const login = async (req,res) => {
  try {
    // kiểm tra tài khoản
    const user = await User.findOne({email: req.body.email}).select("+password");
    // console.log(user);
    if(!user){
      return res.status(400).json({message: "Sai tài khoản"})
    }

    // kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(req.body.password,user.password);
    if(!isMatch){
      return res.status(400).json({message: "Sai mật khẩu"})
    }

    // tạo token - jwt
    const token = jwt.sign({id: user.id},process.env.KEY_SECRET,{expiresIn: "2h"})
    // console.log(token);

    // thông báo
    user.password = undefined;
    return res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      data: user
    })
    
  } catch (error) {
    // console.log(error);
    return res.status(500).json({message: error.message})
  }
}