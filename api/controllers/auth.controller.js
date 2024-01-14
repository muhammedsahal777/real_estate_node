import bcrypt from "bcrypt"
import User from "../models/user_model.js"
import { errorHandler } from "../utils/error.js"
export const signup =async (req,res,next)=>{
    
    try{
        const {username , email,password} = req.body
        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(password, salt);
        const user = new User({username,email , password:hashpassword})
        await user.save()
        res.status(200).json("new user created")
    }catch(error){
        next(error)
    }
}