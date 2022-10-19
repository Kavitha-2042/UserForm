import express from "express"

import * as userController from "../Controller/userController"

const userRoute = express.Router()

userRoute.post("/signup", userController.Signp)

export default userRoute