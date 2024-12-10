import express from "express"
import { login, register } from "../controllers/usercontroller.js";
import { user } from "../models/userModel.js";

const router = express.Router();


router.get('/',async(req,res)=>{
    res.send({"status":"running server"})
})

// router.post('/user-data',async(req,res)=>{

//     const data  =req.body;
    
//     const newUser = await user.create({
//         fullname:data.fullname,
//         username:data.username,
//         password:data.password,
//         gender:data.gender,
//     });

//     res.send({"status":"true",data:data})
// })

router.route("/register").post(register);
 
router.route("/login").post(login)

export default router;