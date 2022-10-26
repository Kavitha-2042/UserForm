import dotenv from "dotenv"
dotenv.config()

import express from 'express'
import joi, { any } from "joi"
import bycryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

import userModel from '../Model/userModel';
import forgotModel from '../Model/forgotModel';

import { ModifiedRequest, MailTypes } from '../interface';

import nodemailer from 'nodemailer'




// const sendMail = async (MailObject: MailTypes) =>{

//     const { from, to, subject } = MailObject

//     const transporter = nodemailer.createTransport({
//         service:"gmail",
//         auth: {
//             user: 'kavithasubburam204@gmail.com',
//             pass: 'kavithA#123'
//         }
//     });
    
//     transporter.sendMail(MailObject)
//     .then(mailResponse=>(console.log(mailResponse)))
//     .catch(err=>console.log(err))
// }



export const Signp = (req:ModifiedRequest, res:express.Response, next:express.NextFunction) =>{
    const {name, email, password, conpass} = req.body;
    
    const validation = joi.object({
        name: joi.string().alphanum().required(),
        email: joi.string().email().required(),
        password:joi.string().min(6).max(20).lowercase().uppercase().required(),
        conpass: password
    })

    validation.validateAsync({ name, email, password, conpass})
    .then((validateAsyncResponse)=>{
        userModel.find({email})
        .then((findResult)=>{
            if(findResult.length > 0){
                return res.json({
                    message:"User already exist"
                })
            }

            if(conpass !== password){
                return res.json({
                    message:"Confrim Password doesn't match with Password"
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

export const Signin = (req:ModifiedRequest, res:express.Response, next:express.NextFunction) =>{
    const { email, password } = req.body

    const validation = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).max(20).uppercase().lowercase().required()
    })

    validation.validateAsync({ email, password})
    .then((validationResult)=>{
        userModel.findOne({ email })
        .then((findResult)=>{
            if(!findResult){
                return res.json({
                    message:"User not found"
                })
            }

            bycryptjs.compare(password, findResult.password )
            .then((comparingResult)=>{
                if(!comparingResult){
                    return res.json({message:"Incorrect Password"})
                }

                let token = jwt.sign( {_id: String(findResult._id)}, "Atokenforsignin")

                return res.json({
                    message:"Signin Successful",
                    user: findResult,
                    token,
                    auth:true
                })

            })
            .catch(err=>console.log(err))

        })
        .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
}

export const Status = (req:ModifiedRequest, res: express.Response) =>{
    if(!req.users){
        return res.status(403).json({
            user:null,
            message: "You're not logged in!!!",
            auth:false
        })
    }
    else{
        return res.status(200).json({
            user:req.users,
            message:"You're logged in!!!",
            auth : true
        })
    }
}

function urlPattern(length:number){
    let characters = "ABCDEFGHKIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    for(let i = 0; i < length; i++){
        result+=characters.charAt(Math.floor(Math.random()*characters.length -1))
    }
    return result
}

const transporter = nodemailer.createTransport({
    service:"sendinblue",
    auth:{
        user:process.env.AUTH_EMAIL,
        pass:process.env.AUTH_PASSWORD
    }
})


export const ForgotPassword = (req:ModifiedRequest, res:express.Response, next:express.NextFunction) =>{
    const { email } = req.body

    try{
        userModel.findOne({ email })
        .then((findEmail)=>{
            if(!findEmail){
                return res.status(401).json({message:"Invalid Email"})
            }

            const url = urlPattern(20);
            const creationTime = Date.now()
            const expiration = creationTime + 10*60*1000

            forgotModel.create({email, url, creationTime, expiration})
            .then((urlLink)=>{
                // return res.json({
                //     message:"Url created",
                //     Link: `/forgotpassword/${urlLink.url}`
                // })

                const mailObject = transporter.sendMail({
                    from: process.env.AUTH_EMAIL,
                    to: email,
                    subject:"Password Reset Link",
                    text: `http://localhost:5000/user/forgotpassword/${urlLink.url}`
                })
                .then((response)=>{
                    return res.json({
                        message:"Link sent",
                        redirection: null
                    })
                })
                .catch((err)=>{
                    return res.json({message:err})
                })
                
            })
            .catch(err=>console.log(err))
            

        })
        .catch(err=>console.log(err))

    }
    catch(err){
        console.log(err)
    }
}

export const UpdatePassword = (req:ModifiedRequest, res:express.Response, next: express.NextFunction) =>{
    const url = req.params.forgotpassURL

    forgotModel.findOne({ url:url })
    .then(( urlResult:any)=>{
        console.log("urlResult: ", urlResult)
        if(!urlResult){
            return res.json({message:"Your url is not valid!!!", status:false})
        }
        const time = Date.now()
        if(time > urlResult.expiration){
            forgotModel.deleteOne({ url })
            .then((urlDelete)=>{
                return res.json({message:"Url link expired"})
            })
            .catch(err=>{
                return res.json({message:"Some error occured"})
            })
        }
        else{
            //return res.json({valid:true})

            const { newPassword, conNewPassword} = req.body;

            const newPassValidation = joi.object({
                newPassword: joi.string().min(6).max(20).uppercase().lowercase().required(),
                conNewPassword: newPassword
            })

            newPassValidation.validateAsync({ newPassword, conNewPassword})
            .then((newPassValidResult)=>{
                if( newPassword === conNewPassword){
                    bycryptjs.hash(newPassword, 15)
                    .then((hashNewPassword)=>{
                        userModel.updateOne({email:urlResult.email}, { password:hashNewPassword})
                        .then(( updatePassword )=>{
                            
                            return res.json({
                                message:"New Password updated!!!",
                                pass:updatePassword,
                                status:true
                            })
                        })
                        .catch(err=>console.log(err))
                    })
                    .catch(err=>console.log(err))
                }
                else{
                    return res.json({message:"New password doesn't match with confirm password"})
                }
            })
            .catch(err=>console.log(err))

        }
    })
    .catch(err=>console.log(err))
}

export const ChangePassword = (req:ModifiedRequest, res:express.Response, next: express.NextFunction) =>{
    const { newPassword, conNewPassword} = req.body

    console.log("test email: ", req.users.email)

    const passValidation = joi.object({
        newPassword: joi.string().min(6).max(20).uppercase().lowercase().required(),
        conNewPassword: newPassword
    })

    passValidation.validateAsync({ newPassword, conNewPassword})
    .then((validateResult)=>{
        if(newPassword === conNewPassword){
            if(newPassword !== req.users.password){
                bycryptjs.hash(newPassword, 15)
                .then((hashNewPassword)=>{
                    console.log("users id1: ", req.users._id)
                    console.log("user email1: ", req.users.email)
                    console.log("users password1: ", req.users.password)

                    userModel.findByIdAndUpdate(req.users._id, {password:hashNewPassword})
                    .then((updateResult)=>{
                        console.log("Update Result: ", updateResult)
                      return res.json({
                            message:"New password updated!!!",
                            password:updateResult,
                            status:true
                        })
                    })
                    .catch(err=>console.log(err))
                })
                .catch(err=>console.log(err))
            }
        }
        else{
            return res.json({message:"Password and confirm password doesn't match!!!", status:false})
        }
    })
    .catch(err=>console.log(err))
}