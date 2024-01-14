import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoute from "./routes/user_route.js"
import signupRoute from "./routes/auth.route.js"
import cors from "cors"

dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected to database")
}).catch((err)=>{
    console.log(err)
})
const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/user" , userRoute)
app.use("/api/user" , signupRoute)

app.use((err,req,res,next) =>{
    const statusCode =err.statusCode || 500
    const message = err.message || "internal server error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})

app.listen(3000,()=>{
    console.log("connected...")
})