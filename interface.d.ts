import express from "express"
import middleware from './Middleware/middleware';

export interface ModifiedRequest extends express.Request {
    users : any
}

export interface ModifiedRouter extends express.IRouter{
    get: (path:string, ...middleware:any)=>void
    post: (path:string, ...middleware:any)=>void
}

export interface MailTypes {
    from:string,
    to : string,
    subject : string,
    text: string
}