const {usermodel}=require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const SECREAT_KEY="Key"

const login=async(req,res)=>{
    const {username,password}=req.body;
    try {
        const existingUser = await usermodel.findOne({
            username
        });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if (!matchPassword) {
            return res.status(401).json({ message: "wrong password" });
        }

        const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, SECREAT_KEY);
        res.status(200).json({ user: existingUser, token: token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
    
}
module.exports={login}
