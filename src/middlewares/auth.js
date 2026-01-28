import jwt from "jsonwebtoken"

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