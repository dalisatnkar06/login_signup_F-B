
const express = require("express");
const path = require("path");
const mongoose=require("mongoose");
const userRoute=require("./Routes/userRoute")
require("dotenv").config()
const app = express();
const port=process.env.port


app.set("view engine","ejs")

app.use(express.urlencoded({extended:false}))

app.use(express.static("public"))

app.use(express.json());

// routes file
app.use("/",userRoute);


// path for login page
app.get("/login",(req,res)=>{
    res.render("login")
})

// path for signup page
app.get("/signup",(req,res)=>{
    res.render("signup")
})

// connect Mangoose
mongoose.connect("mongodb://127.0.0.1:27017/Practice_Data")
    .then(()=>{
        app.listen(port,()=>{
            console.log(`server is start ${port}`)
        })
    })
    .catch((error)=>{
        console.log(error)
    })
