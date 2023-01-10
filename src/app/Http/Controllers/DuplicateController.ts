import  UserModel from '../../Models/User';
import { Request, Response } from 'express';
// import {fileURLToPath} from 'url';
// require('dotenv').config()
//  const __filename = fileURLToPath(import.meta.url);

        // 
        // const __dirname = path.dirname(__filename);

const checkDuplicate = async (req:Request, res:Response)=>{
    const user = req.body.user;
 
    //check for duplicate username in the DB
    try{
        const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const userType = EMAIL_REGEX.test(user);
        let foundUser;
    if(userType){
    foundUser = await UserModel.findOne({email:user}).exec();
    }else{
    foundUser = await UserModel.findOne({username:user}).exec();
    }
        
            if(foundUser){return res.status(409).json({'message':  "taken"});// conflict
        }else{
            return res.status(200).json({'message':  "available"})
        }
    }catch(err){
      return res.status(500).json({'error':  err})  
    }
    
  
}




export default checkDuplicate;