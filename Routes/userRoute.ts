import express from "express"

import * as userController from "../Controller/userController"
import middleware from "../Middleware/middleware"
import { ModifiedRouter } from '../interface';


const userRoute:ModifiedRouter = express.Router()

userRoute.post("/signup", middleware, userController.Signp)

userRoute.post("/signin", middleware, userController.Signin)

userRoute.get("/status", middleware, userController.Status)

userRoute.post("/forgotpassword", middleware, userController.ForgotPassword)

export default userRoute