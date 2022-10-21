import express from "express"
import jwt from "jsonwebtoken"
import { ModifiedRequest } from "../interface"
import userModel from "../Model/userModel"

const middleware = (req:ModifiedRequest, res:express.Response, next:express.NextFunction) =>{
    let token = req.headers["jwt-token"] as string

    if(token){
        
        try{
            let verifying = jwt.verify(token, "Atokenforsignin")
            let decoding:any = jwt.decode(token) 
            
            if(req.path !== '/signup' && req.path !== '/signin' && req.path !== '/forgotpassword' && req.path.startsWith('/forgotpassword')){
                userModel.findById({_id: decoding._id})
                .then((response)=>{
                    if(response?.password){
                        response.password = ""
                    }

                    req.users = response
                    next()
                })
            }
            else{
                return res.json({message:"Invalid path"})
            }
        }
        catch (error){
            return res.json({message:"Invalid token or token expired"})
        }
    }
    else{
            if( req.path === '/signup' || req.path === '/signin' || req.path === '/forgotpassword' || req.path.startsWith('/forgotpassword') ){
                next()
            }
            else{
                return res.json({ message:"Path is invalid" })
            }
    }

}

export default middleware