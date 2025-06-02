import jwt from 'jsonwebtoken'

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

  jwt.verify(token,"123456",(err,decode) => {
    // console.log(decode);
    if(err){
      return res.status(403).json({message: "Sai token hoặc hết hạn"})
    }
    req.userId = decode.id;
  })

  next()
}