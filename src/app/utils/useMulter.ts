import {Response,Request, NextFunction } from 'express';
import path from 'path';
import multer from 'multer';
import fs from 'fs';
import multerFilter from '../../config/multerConfig';

const fsPromises = fs.promises
const BASE_PATH = path.join( __dirname,"../../../","public/uploads");

(async()=>{
    if(!fs.existsSync(BASE_PATH)){
   await fsPromises.mkdir(BASE_PATH,{recursive:true})
}
})()

const useMulter =(uploadpath:string)=>{
  const destination = path.join(BASE_PATH,uploadpath);
  
  (async()=>{
    if(!fs.existsSync(destination)){
   await fsPromises.mkdir(destination,{recursive:true})
}
})()
var storage =   multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, destination);
    },
   
    filename: function(req, file, callback) {
      callback(null, Date.now() +"--" +file.originalname);
    }
  });
  
  var upload = multer({ storage : storage, fileFilter:multerFilter})
upload.fields([
    {name:'chatAttachment',maxCount:12},
    {name:'chatImage',maxCount:12},
    {name:'avatar',maxCount:1},
    {name:'siteImage',maxCount:1},
    {name:'upload',maxCount:1},

])
    return upload;
}
export default useMulter