// const {usermodel}=require("../models/user");
// const bcrypt=require("bcrypt");
// const jwt=require("jsonwebtoken");
// const SECREAT_KEY="Key"

// const signup=async(req,res)=>{
//     try{
//         const {username,email,password}=req.body;

//         const user=await usermodel.findOne({email})
//         if (user){
//             return res.status(400).json({message:"user is  exist"})
//         }
    
//         const hashedpassword = await bcrypt.hash(password,10)
    
//         const result=await usermodel.create({
//             email,
//             username,
//             password:hashedpassword
//         })
    
//         const token=jwt.sign({email:result.email,id:result._id},SECREAT_KEY)
//         res.status(201).json({user:result,token:token})
//     }
//     catch(error){
//         console.log(error)
//         res.status(500).json({ message: "somthing went wrong" });

//     }
    
// }
// module.exports={signup}

const { usermodel } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email address format" });
        }

        // Validate password complexity
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Password should be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character." });
        }

        const user = await usermodel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await usermodel.create({
            email,
            username,
            password: hashedPassword
        });

        const token = jwt.sign({ email: result.email, id: result._id },process.env.SECREAT_KEY);
        res.status(201).json({ user: result, token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { signup };
