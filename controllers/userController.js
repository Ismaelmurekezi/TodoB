import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcryt from "bcrypt"


export const login = async (req, res) => {
    
}

export const register = async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    const hashPassword=bcryt.hashSync(password,10)
    const newUser = new userModel({
       username,email,password:hashPassword,confirmPassword:hashPassword
    })
    try {
        const userExist = await userModel.findOne({ email })
        if (userExist) {
            return res.status(200).json({success:true,message:"User already exist"})
        }
        await newUser.save()
        res.status(201).json({success:true,message:"user created successfully",newUser})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,error:error.message})
        
    }
}



