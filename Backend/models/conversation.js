import mongoose from "mongoose";

const conversation = new mongoose.Schema({
    parcipatents:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    messeges:[{
         type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
},{timestamp:true}); 

export const Baate = mongoose.model("Baate", conversation )