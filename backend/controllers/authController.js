const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../utils/catchAsyncErrors');

exports.registerUser = catchAsyncErrors(async(req,res,next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar:{
      public_id:'Avators/dsvbpny402gelwugv2le_ifzm0l',
      url:'https://res.cloudinary.com/dkv0kqy6l/image/upload/v1660187201/Avators/dsvbpny402gelwugv2le_ifzm0l.jpg'
    }
  })
  const jwtToken = user.jwtWebToken()

  res.status(201).json({
    status: true,
    user,
    token: jwtToken
  })
})