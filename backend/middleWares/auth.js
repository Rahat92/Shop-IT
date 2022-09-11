const User = require('../models/user')
const jwt = require('jsonwebtoken')
const user = require('../models/user')
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors = require('../utils/catchAsyncErrors')

exports.isUserExist = catchAsyncErrors(async(req,res,next) => {
  const { token } = req.cookies
  if(!token){
    return next(new ErrorHandler('Please log in first',400))
  }
  const decoded = jwt.verify(token,process.env.JWT_SECRET)
  req.user = await User.findById(decoded.id)
  next()
})