export const validateRequest = (schema) => {
  // middleware
  return (req, res, next) => {
    const {error, value } = schema.validate(req.body,{
      abortEarly: false // Không thông báo lỗi sớm
    });

    if(error){
      const messages = error.details.map(item => item.message)
      // console.log(messages);
      return res.status(400).json({
        isSuccess: false,
        message: messages
      })
    }

    req.body = value
    next();
  }
}