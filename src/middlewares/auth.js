import jwt from "jsonwebtoken";
import User from "../models/user.model"

export const checkAuth = (req, res, next) =>{
  try {
    const header = req.headers.authorization;
    
    const token = header?.split(' ')[1]
    if(!token){
      return res.status(401).json({
        isSuccess: false,
        message: "Thiếu token"
      })
    }
    
    try {
      const decoded = jwt.verify(token, process.env.KEY_SECRET)
      req.user =  decoded;
      next(); // chuyển qua tác vụ tiếp theo
      
    } catch (error) {
      if(error.name == "JsonWebTokenError"){
        return res.status(403).json({
          isSuccess: false,
          message: "Sai token, vui lòng đăng nhập lại"
        })
      }
      else if(error.name == "TokenExpiredError"){
        return res.status(403).json({
          isSuccess: false,
          message: "Token hết hạn, vui lòng đăng nhập lại"
        })
      }
    }
    
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      message: error.message
    })
  }
}

export const checkPermission = (...roles) =>{
  return async (req,res, next) => {
    console.log(roles);
    console.log(req.user);
    try {
      const user = await User.findById(req.user.userId);
      if(!user){
        return res.status(401).json({
          isSuccess: false,
          message: "Không tìm thấy user, vui lòng đăng nhập lại"
        })
      }

      const isPermission = roles.includes(user.role);
      if(!isPermission){
        return res.status(403).json({
          isSuccess: false,
          message: "Bạn không có quyền sử dụng chức năng này"
        })
      }
        
      next();
    } catch (error) {
      return res.status(500).json({
        isSuccess: false,
        message: error.message
      })
    }
    
  }
}