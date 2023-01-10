import {Response,Request, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

import {MRequest, MResponse } from "../../../interfaces/interfaces";
// require('dotenv').config();

export interface decoded {
    userInfo:{
        user:string,
        username:string,
        userEmail:string,
        roles:number[]
    }
}

 
const key:Secret =process.env.ACCESS_TOKEN_SECRET!;
const verifyJWT= (req: Request, res:Response, next:NextFunction)=>{
    const authHeader = req.headers.authorization! || req.headers.Authorization!;
    if(typeof authHeader === 'string'){
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus (401);
    const token = authHeader.split(' ')[1];
      jwt.verify(
        token,
        key,
        (err, options:any)=>{
            if(err)return res.sendStatus(403);// invalid token

            req.user = options?.userInfo?.user;
            req.username = options?.userInfo?.username;
            req.email = options?.userInfo?.email;
            req.roles = options?.userInfo?.roles;
            next();
        }
    );
}
  
}

export default verifyJWT;