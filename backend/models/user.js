const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength:[20, 'A name should be in 20 character']
  },
  email: {
    type: String,
    required: true,
    unique: true,  
    validate: [validator.isEmail, 'Please inter a valid' ]
  },
  password: {
    type: String,
    required: true,
    minlength:[8, 'A password should at least 8 character'],
    select: false
  },
  avatar:{
    public_id:{
      type:String,
      required: true
    },
    url:{
      type: String,
      requred: true
    }
  },
  role:{
    type:String,
    default:'user'
  },
  createAt:{
    type:String,
    default:Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
})

userSchema.pre('save',async function(next){
  if(!this.isModified('password')){
    next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})
userSchema.methods.jwtWebToken = function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRES_TIME
  })
}
module.exports = mongoose.model('User',userSchema)