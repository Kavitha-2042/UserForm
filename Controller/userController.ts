import express from 'express'
import joi from "joi"
import bycryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

import userModel from '../Model/userModel';

export const Signp = (req:express.Request, res:express.Response, next:express.NextFunction) =>{
    const {name, email, password} = req.body;
    
    const validation = joi.object({
        name: joi.string().alphanum().required(),
        email: joi.string().email().required(),
        password:joi.string().min(6).max(20).lowercase().uppercase().required()
    })

    validation.validateAsync({ name, email, password})
    .then((validateAsyncResponse)=>{
        userModel.find({email})
        .then((findResult)=>{
            if(findResult.length > 0){
                return res.json({
                    message:"User already exist"
                })
            }

            bycryptjs.hash(password, 15)
            .then((hashPassword)=>{
                userModel.create({name, email, password:hashPassword})
                .then((createResponse)=>{
                    const token = jwt.sign({_id:createResponse._id}, "Atokenforsignupandsignin")
                    return res.json({
                        message:"Signup Successfull",
                        user:createResponse,
                        token,
                        auth:true
                    })
                })
                .catch(err=>console.log(err))
            })
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
}