import bcrypt from "bcrypt"
import User from "../models/user_model.js"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"


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

export const signin  = async(req,res, next)=>{
    try{
        const {email , password} = req.body
        const isUser = await User.findOne({email})
        if(!isUser) return next(errorHandler(404,"user not found"))
        const isPassword =  bcrypt.compareSync(password, isUser.password);
        if(!isPassword) return next(errorHandler(401,"wrong credentials"))
        const token = jwt.sign({id:isUser._id} , process.env.JWT_SECRET)
        const { password :pass , ...rest} = isUser._doc
        res.cookie("access_token" , token,{ httpOnly: true } )
        res.status(200).json(rest)
    }catch(error){
        next(error)
    }
}

export const google = async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = user._doc;
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
  
      } else {
        const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(generatedPassword, salt);
        const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4) , email: req.body.email, password: hashedPassword, avatar: req.body.photo });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = newUser._doc;
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
  
      }
    } catch (error) {
      next(error)
    }
  }