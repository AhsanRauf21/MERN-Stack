const { default: mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    }

},{timestamps:true})


const model = mongoose.model('user',userSchema)

exports.UserModel = model