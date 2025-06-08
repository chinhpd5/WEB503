import jwt from 'jsonwebtoken'
import User from '../models/user.model';
import dotenv from 'dotenv'
dotenv.config();

export const checkAuth = (req,res,next) =>{
  const header = req.headers["authorization"];
  // console.log(header);
  if(!header){
    return res.status(403).json({message: "Thiếu header"})
  }

  // const token = header.replace("Bearer ","");
  const token = header.split(" ")[1];
  // console.log(token);
  if(!token){
    return res.status(403).json({message: "Thiếu token"})
  }

  jwt.verify(token,process.env.KEY_SECRET,(err,decode) => {
    // console.log(decode);
    if(err){
      return res.status(403).json({message: "Sai token hoặc hết hạn"})
    }
    req.userId = decode.id;
  })

  next()
}

// rest parameter
export const checkPermission = (...roles) =>{
  return async (req,res,next) => {
    try {
      const user = await User.findById(req.userId);
      console.log(user);
      if(!user){
        return res.status(403).json({message: "Không tìm thấy user"})
      }

      const isPermission = roles.includes(user.role);
      if(!isPermission){
        return res.status(403).json({message: "Bạn không có quyền sử dụng chức năng này"})
      }

      next();
    } catch (error) {
      return res.status(500).json({message: error.message})
    }
    
  }
}