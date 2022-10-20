import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from "cors"

import userRoute from './Routes/userRoute'

const app:express.Application = express()

app.use(cors({
    credentials:true,
    origin:"http://localhost:3000",
    methods:["GET", "POST"]
}))

app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/user', userRoute)

mongoose.connect('mongodb://localhost:27017/loginregister', ()=>{
    console.log("DB Connected...")
    app.listen(5000, ()=>{
        console.log("Server runs on port 5000....")
    })
})