const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../utils/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

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
  sendToken(user,200,res)
})
exports.login = catchAsyncErrors(async(req,res,next) => {
  const { email, password } = req.body;
  if(!email || !password){
    return next(new ErrorHandler('Please Enter email and password', 400)) 
  }
  const user = await User.findOne({email}).select('+password')
  if(!user){
    return next(new ErrorHandler('Invalid email and password',401))
  }
  const isPasswordMatched = await user.comparePasword(password)
  if(!isPasswordMatched){
    return next(new ErrorHandler('Invalid email or password',401))
  }
  sendToken(user,200,res)
})

exports.logOut = (req,res,next) => {
  res.cookie('token',null,{
    expires: new Date(Date.now()),
    httpOnly: true
  })
  res.status(200).json({
    success:true,
    message: 'Log Out'
  })
}