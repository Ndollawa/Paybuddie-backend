import  UserModel from '../../Models/User';
import  bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import path from 'path';
import { Request,Response } from 'express';
// import {fileURLToPath} from 'url';
// require('dotenv').config()
//   const __filename = fileURLToPath(import.meta.url);

        // 
        // const __dirname = path.dirname(__filename);
interface userInfoProps{
userInfo:{
        _id:string | undefined | null;
       firstName: string | undefined | null;
       lastName: string | undefined | null;
       email: string | null;
       username: string | undefined;
       phone: string | undefined | null;
       dob: string | undefined | null;
       gender: string | undefined;
       address: string | undefined;
       city: string | undefined;
       state: string | undefined;
       country: string | undefined;
       occupation: string | undefined;
       bio: string | undefined;
       userImage: string | undefined ;
       accountStatus:undefined | number | null;
       verificationStatus:string | number | boolean;
       accountSecurity_2FA: boolean | string | null;
    }
} 

class AuthController{

    //hanles user login
    login = async (req:Request, res:Response)=>{
        const cookies = req.cookies;
        const {user, password} = req.body;

    if(!user || !password)return res.status(400).json({message: 'Email  or Username and password are required!'});

    //check for user  in the DB || username:username
    const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const userType = EMAIL_REGEX.test(user);
        let foundUser;
    if(userType){
    foundUser = await UserModel.findOne({email:user}).exec();
    }else{
    foundUser = await UserModel.findOne({username:user}).exec();
    }
// console.log(foundUser)
    if(!foundUser)return res.status(401).json({message:"No User with Credentials"});// unauthorized
    if(foundUser.accountStatus !== 'active')return res.status(401).json({message:"Unauthorized access"});// unauthorized
    try{

        //evaluate password
        const match = await bcrypt.compare(password,foundUser.password);
        if (!match) return res.status(401).json({ message: 'Unauthorized Access' })

      
        if(match){
            //create JWTs
            const userRoles = foundUser?.roles
            const roles = Object.values(userRoles!).filter(Boolean);
            const accessToken = jwt.sign(
                {
                    userInfo:{
                        _id:foundUser._id,
                        email:foundUser.email,
                        userImage:foundUser.userImage,
                        username:foundUser.username,
                        firstName:foundUser.firstName,
                        lastName:foundUser.lastName,
                        phone:foundUser.phone,
                        dob:foundUser.dob,
                        gender: foundUser.gender,
                        address: foundUser.address,
                        city: foundUser.city,
                        state: foundUser.state,
                        country: foundUser.country,
                        occupation: foundUser.occupation,
                        bio: foundUser.bio,
                        accountStatus:foundUser.accountStatus,
                        verificationStatus:foundUser.verificationStatus,
                        accountSecurity_2FA:foundUser.accountSecurity_2FA,
                        roles:roles
                    }
                },
                `${process.env.ACCESS_TOKEN_SECRET}`,
                {expiresIn: '3m'}
            );
            const newRefreshToken = jwt.sign(
                {
                userInfo:{
                     _id:foundUser._id,
                        email:foundUser.email,
                        userImage:foundUser.userImage,
                        username:foundUser.username,
                        firstName:foundUser.firstName,
                        lastName:foundUser.lastName,
                        phone:foundUser.phone,
                        dob:foundUser.dob,
                        gender: foundUser.gender,
                        address: foundUser.address,
                        city: foundUser.city,
                        state: foundUser.state,
                        country: foundUser.country,
                        occupation: foundUser.occupation,
                        bio: foundUser.bio,
                        accountStatus:foundUser.accountStatus,
                        verificationStatus:foundUser.verificationStatus,
                        accountSecurity_2FA:foundUser.accountSecurity_2FA,
                        roles:roles
                }
                },
                `${process.env.REFRESH_TOKEN_SECRET}`,
                {expiresIn:'15m'}
            );

            let newRefeshTokenArray = !cookies?.jwt
                        ?foundUser.refreshToken 
                        : foundUser.refreshToken.filter(rt =>rt !== cookies.jwt);
      

             if(cookies?.jwt){
                const refreshToken = cookies.jwt
                const foundUser = await UserModel.findOne({refreshToken}).exec()
                if(!foundUser){
                   newRefeshTokenArray =[]; 
                }
    res.clearCookie('jwt',{httpOnly:true, secure:true, sameSite:'none'});

             } 
            

                //save refresh token of current user 
                foundUser.refreshToken = [...newRefeshTokenArray,newRefreshToken];
                const result = await foundUser.save() 
                // create secure cookie with new accessToken
            res.cookie('jwt', newRefreshToken,{httpOnly:true, secure:true, sameSite:'none', maxAge: 24
            *60*60*1000});
            res.json({accessToken})

    } else{
            res.status(401).json({message:"Incorrect password or credentials"});
        }
      
    }catch(err:any){
        res.status(500).json({message: err.message});
    }
}
logout = async (req:Request, res:Response)=>{
    const cookies = req.cookies;
    if(!cookies?.jwt)return res.status(401).json({message:'Unauthorized user'});
const refreshToken = cookies.jwt; 
    //on logout delete access token
    const foundUser = await UserModel.findOne({refreshToken}).exec();
    if(!foundUser){
    res.clearCookie('jwt',{httpOnly:true, secure:true, sameSite:'none' }) 
        return res.sendStatus(204);// unauthorized  
  
    }
   //delete refresh token from DB
    foundUser.refreshToken =  foundUser.refreshToken.filter(rt =>rt !== refreshToken);
    ;
    const result = await foundUser.save();
    res.clearCookie('jwt',{httpOnly:true, secure:true, sameSite:'none' }) 
    return res.sendStatus(204);// unauthorized  

}
refreshTokenHandler = async (req:Request, res:Response)=>{
    const cookies = req.cookies;
    // console.log(JSON.stringify(cookies))
    if(!cookies?.jwt)return res.status(401).json({message:'No cookie'});
    const refreshToken = cookies.jwt;
   res.clearCookie('jwt',{httpOnly:true, secure:true, sameSite:'none' })   
    //check for user  in the DB

    const foundUser = await UserModel.findOne({refreshToken}).exec();
   
    // Detect refresh token reuse! (Hacked token)
//    console.log(foundUser)
    if(!foundUser){
       jwt.verify(
        refreshToken,
        `${process.env.REFRESH_TOKEN_SECRET}`,
        async(error:any, decodedToken:any) =>{
        // delete all tokens on reuse
            if(error) return res.status(403).json({message:'Access Forbidden'}); //Forbidden
            const hackedUser = await UserModel.findOne({email:decodedToken.userInfo.email}).exec();
            hackedUser!.refreshToken = [];
            const result = await hackedUser!.save();
            // console.log(result)
        }
        )
       return res.status(403).json({message:'Access Forbidden'});// Forbidden  

    }

    const newRefeshTokenArray = foundUser.refreshToken.filter(rt =>rt !== refreshToken);
        //evaluate jwt


       jwt.verify(
        refreshToken,
        `${process.env.REFRESH_TOKEN_SECRET}`,
       async (err:any, decodedToken:any)=>{

        // console.log(decodedToken)
        if(err){
            foundUser.refreshToken = [...newRefeshTokenArray];
            const result = await foundUser.save();
        }
       
            if(err || foundUser.email !== decodedToken.userInfo.email) return res.status(403).json({message:'Access Forbidden'});;// forbidden
            const roles = Object.values(foundUser.roles!);
            const accessToken =jwt.sign(
                {
                userInfo:{
                    _id:foundUser._id,
                    email:foundUser.email,
                    userImage:foundUser.userImage,
                    username:foundUser.username,
                    firstName:foundUser.firstName,
                    lastName:foundUser.lastName,
                    phone:foundUser.phone,
                    dob:foundUser.dob,
                    gender: foundUser.gender,
                    address: foundUser.address,
                    city: foundUser.city,
                    state: foundUser.state,
                    country: foundUser.country,
                    occupation: foundUser.occupation,
                    bio: foundUser.bio,
                    accountStatus:foundUser.accountStatus,
                    verificationStatus:foundUser.verificationStatus,
                    accountSecurity_2FA:foundUser.accountSecurity_2FA,
                    roles:roles
                    }
                },
                `${process.env.ACCESS_TOKEN_SECRET}`,
                {expiresIn: '3m'}
            )

            const newRefreshToken = jwt.sign(
                {
                  userInfo:{   _id:foundUser._id,
                        email:foundUser.email,
                        userImage:foundUser.userImage,
                        username:foundUser.username,
                        firstName:foundUser.firstName,
                        lastName:foundUser.lastName,
                        phone:foundUser.phone,
                        dob:foundUser.dob,
                        gender: foundUser.gender,
                        address: foundUser.address,
                        city: foundUser.city,
                        state: foundUser.state,
                        country: foundUser.country,
                        occupation: foundUser.occupation,
                        bio: foundUser.bio,
                        accountStatus:foundUser.accountStatus,
                        verificationStatus:foundUser.verificationStatus,
                        accountSecurity_2FA:foundUser.accountSecurity_2FA,
                        roles:roles
                }
                },
                `${process.env.REFRESH_TOKEN_SECRET}`,
                {expiresIn:'15m'}
            );
                //save refresh token of current user 
                foundUser.refreshToken = [...newRefeshTokenArray,newRefreshToken];
                const result = await foundUser.save();

                res.cookie('jwt', newRefreshToken,{httpOnly:true, secure:true, sameSite:'none', maxAge: 24
                *60*60*1000});
                res.json({accessToken})
                // console.log(accessToken)
        }
        );
        
}

}

export default new AuthController();