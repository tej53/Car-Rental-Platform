import User from "../models/User.js";
import bcrypt from "bcrypt";//for password hashing
import jwt from "jsonwebtoken";//
import Car from "../models/Car.js";


//generate JWT token

function genrateToken(userId){
    const payload = { id: userId };
    return jwt.sign(payload, process.env.JWT_SECRET);
}

//Register function

/* 
REGISTER
User → Send name/email/password
        ↓
Check fields
        ↓
Check if user exists
        ↓
Encrypt password
        ↓
Save user in DB
        ↓
Create JWT token
        ↓
Send token to user
*/
export const registerUser = async(req, res)=>{
    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password || password.length < 8){
            return res.json({success : false, message : "Fill all the fields"})
        }

        const userExists = await User.findOne({email});

        if(userExists){
            return res.json({success : false, message : "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password : hashedPassword});
        
        const token = genrateToken(user._id.toString());
        res.json({success : true, token});
    }catch(error){
        console.log(error.message);
        return res.json({success : false, message : error.message});
    }
}

//Login User

/*
LOGIN
User → Send email/password
        ↓
Find user
        ↓
Check password
        ↓
Generate JWT token
        ↓
Send token
*/
export const loginUser = async(req, res)=>{
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.json({success : false, message : "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success : false, message : "Invalid credentials"});
        }

        const token = genrateToken(user._id.toString());
        res.json({success : true, token});
    }catch(error){
        console.log(error.message);
        return res.json({success : false, message : error.message});
    }
}

//get user data using token (JWT)
export const getUserData = async (req, res)=>{
    try{
        const {user} = req;
        res.json({success : true, user});
    }catch(error){
        console.log(error.message);
        return res.json({success : false, message : error.message});
    }
}

//Get all cars for the frontend
export const getCars = async (req, res)=>{
    try{
        const cars = await Car.find({isAvailable : true})
        res.json({success : true, cars})
    }catch(error){
        console.log(error.message);
        return res.json({success : false, message : error.message});
    }
}