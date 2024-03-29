const { mongoose } = require("mongoose")

const userShema=mongoose.Schema({
    username :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true
    }

})


const usermodel=mongoose.model("user",userShema);
module.exports={usermodel}
