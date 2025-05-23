
export const validateRequest = (schema,target= 'body') => {
  return (req, res, next) => {
    const {error,value} = schema.validate(req[target],{
      abortEarly: false, // thông báo tất cả các lỗi nếu có
      stripUnknown: true, // loại bỏ những thuộc tính dư thừa
    })

    if(error){
      return res.status(400).json({
        message: error.details.map(item => item.message)
      })
    }

    req[target]= value;

    next();// chuyển qua middleware hay tác vụ tiếp theo
  }

}