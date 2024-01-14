import express from "express"
import { test } from "../controllers/user_test.js";
const userRoute = express.Router()

userRoute.get("/test" , test)

export default userRoute;