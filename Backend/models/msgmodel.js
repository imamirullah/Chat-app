import mongoose from "mongoose";

const msgModel = new mongoose.Schema({
    senderid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        requied: true
    },
    recieverid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        requied: true
    },
    message:{
        type:String,
        requied: true
    }
},{timestamp:true});

export const Message = mongoose.model("Message", msgModel);
