const { default: mongoose } = require("mongoose");


const taskSchema = new mongoose.Schema({
title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},

category:{
    type:String,
    required:true
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true

}

},{timestamps:true})


const model = mongoose.model("task",taskSchema)

exports.TaskModel = model