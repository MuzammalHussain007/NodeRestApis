const express = require('express');
const { signup, signin , forgetPassword } = require('../controller/userController');

const userRoute = express.Router()

userRoute.post('/signup',signup);

userRoute.post('/signin',signin);

userRoute.post("/forgetPassword", forgetPassword);

module.exports = userRoute;