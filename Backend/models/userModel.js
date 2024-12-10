import mongoose from "mongoose";

const usermodel = new mongoose.Schema({
    fullname:{
       type:String,
       required: true 
    },
    username:{
        type:String,
        required: true, 
        unique:true
    },
    password:{
        type:String,
        required: true, 
     },
    profilepic:{
        type:String,
        default: " ", 
     },
     gender:{
        type:String,
        enum: ["male", "female"],
        reuired: true
     }
    },{timestamp:true});

export const user = mongoose.model("user", usermodel);