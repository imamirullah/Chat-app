import bcrypt from 'bcrypt'
import {user} from '../models/userModel.js'
import { json } from 'express';
import jwt from 'jsonwebtoken';  // Correct way to import jsonwebtoken


export const register = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender, profilepic } = req.body;

        // Check if all required fields are provided
        if (!fullname || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Check if username already exists
        const existingUser = await user.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists, please try a different one" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const maleprofile = `https://avatar.iran.liara.run/public/boy?username${username}`;
        const feleprofile = `https://avatar.iran.liara.run/public/boy?username${username}`;
        

        // Create the user
        const newUser = await user.create({
            fullname,
            username,
            password: hashedPassword,
            profilepic:gender=== "male" ? maleprofile:feleprofile,
            gender,
        });
        return res.status(201).json({
            message: "Accound created Successfully",
            success: true
        })
 
        return res.status(201).json({ message: "User registered successfully", user: newUser });

    } catch (error) {
        console.error("Error in user registration:", error);
        return res.status(500).json({ message: "Server error, please try again later" });
    }
};


// end registration logic




// login section


 export const login = async (req, res)=>{
    try {
        const { username, password} =req.body
        console.log("user =",username, password)
        if ( !username || !password) {
            return res.status(400).json({ message: "username & password are incorrect" });
        }
        const userData = await user.findOne({username});
        console.log("user data =",userData)
        if(userData==null){
            console.log("if condition of login")
            return res.status(400).json({
                message:"incorrect username",
                success: false
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, userData.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"incorrect Password",
                success: false
            }) 
        }

        const tokendata = {
            userid: userData._id
        }

        const token = await jwt.sign(tokendata, process.env.JWT_SECRET_KEY)
        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpOnly: true}).json({
            _id:userData._id,
            username:userData.username,
            fullname:userData.fullname,
            profilepic:userData.profilepic
        }); 
    } catch (error) {
        console.error("Error in user registration:", error);
        return res.status(500).json({ message: "Server error, please try again later" });
    }
 }