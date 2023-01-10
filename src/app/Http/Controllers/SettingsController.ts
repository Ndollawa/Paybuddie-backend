import  SettingModel from '../../Models/Setting';
import  bcrypt from 'bcrypt';
import path from 'path';
// import {fileURLToPath} from 'url';
import { Request, Response } from 'express';
// require('dotenv').config()
//  const __filename = fileURLToPath(import.meta.url);

        // 
        // const __dirname = path.dirname(__filename);
class SettingsController{
    constructor(){
        this.index = this.index.bind(this);
       

   }
index = async(req:Request, res:Response)=>{

    try {
    const result = await SettingModel.findOne() 
    res.status(200).json({"settings":result});  
    } catch (error) {
        res.status(500).json({"error":error})
    }

}
createSettings = async(req:Request, res:Response)=>{
   const {data} = req.body;
//  
    try {
    const result = await SettingModel.findOne() 
    res.status(200).json({"settings":result});  
    } catch (error) {
        res.status(500).json({"error":error})
    }

}
deleteSettings = async(req:Request, res:Response)=>{
   const {data} = req.body;
//  
    try {
    const result = await SettingModel.findOne() 
    res.status(200).json({"settings":result});  
    } catch (error) {
        res.status(500).json({"error":error})
    }

}
updateHomepageSettings = async(req:Request, res:Response)=>{
   const {data} = req.body;
    console.log(data)
    try {
    const result = await SettingModel.findOne() 
    res.status(200).json({"settings":result});  
    } catch (error) {
        res.status(500).json({"error":error})
    }

}

updateDashboardSettings = async(req:Request, res:Response)=>{
    const{_id,Theme } =  req.body
    console.log(Theme)
    try {
    const result = await SettingModel.findOne({_id})
    result?.dashboardConfig?.layoutOptions = {...Theme}
    result?.save()
    // const result = await SettingModel.findOneAndUpdate({_id},{dashboardConfig:Theme}) 
    res.status(200).json({"response":'success'});
    } catch (error) {
        res.status(500).json({"error":error})
    }

}
updatePagesSettings = async(req:Request, res:Response)=>{
   const {data} = req.body;
//  
    try {
    const result = await SettingModel.findOne() 
    res.status(200).json({"settings":result});  
    } catch (error) {
        res.status(500).json({"error":error})
    }

}
updateGeneralSettings = async(req:Request, res:Response)=>{
   const {data} = req.body;
//  
    try {
    const result = await SettingModel.findOne() 
    res.status(200).json({"settings":result});  
    } catch (error) {
        res.status(500).json({"error":error})
    }

}





}

export default new SettingsController();