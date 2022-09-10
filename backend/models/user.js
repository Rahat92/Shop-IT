const mongoose = require('mongoose')
const validator = require('validator')

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
    validate: [validator.isEmail, 'Please inter a valid' ],
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

module.exports = mongoose.model('User',userSchema)