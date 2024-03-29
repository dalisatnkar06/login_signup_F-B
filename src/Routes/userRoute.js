const express=require("express");

const {login}=require("../controller/login");
const { signup } = require("../controller/singup");

const userRoute=express.Router();

userRoute.post("/login",login);
userRoute.post("/signup",signup)

module.exports=userRoute;