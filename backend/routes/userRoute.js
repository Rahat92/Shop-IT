const express = require('express');
const router = express.Router();
const { registerUser,login, logOut } = require('../controllers/authController')

router
  .route('/register')
  .post(registerUser)
router
  .route('/login')
  .post(login)
router
  .route('/logout')
  .get(logOut)
module.exports = router