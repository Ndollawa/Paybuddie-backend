import  SettingsModel from '../../Models/Setting';
import { Request, Response } from 'express';
import BaseController from './BaseController';

class SettingsController extends BaseController{
    constructor(){
       super(SettingsModel)
       

   }

updateHomepageSettings = async(req:Request, res:Response)=>{
   const {_id,data} = req.body;
//    console.log(data)
    const result = await SettingsModel.findOneAndUpdate({_id},{landingPageConfig:{...data}}) 
    res.status(200).json({message:'success'});  

}

updateDashboardSettings = async(req:Request, res:Response)=>{
    const{_id,data} =  req.body
   
    // console.log(req.body)
    const result = await SettingsModel.findOneAndUpdate({_id},{dashboardConfig:{layoutOptions:{...data}}}) 
    res.status(200).json({message:'success'});

}

updatePagesSettings = async(req:Request, res:Response)=>{
   const {_id, data} = req.body;
    const result = await SettingsModel.findOneAndUpdate({_id},{pages:{...data}}) 
    res.status(200).json({message:'sucess'});  
}
updateGeneralSettings = async(req:Request, res:Response)=>{
   const {_id,data} = req.body;
    const result = await SettingsModel.findOneAndUpdate({_id},{companyDetails:{...data}}) 
    res.status(200).json({messsage:'success'});  
 
}

uploads = async(req:Request, res:Response)=>{
    const uploadType = req.params.uploadType
    // console.log(uploadType)
    const {_id} = req.body
    const file = req?.file!
    if(file){
        try {
                    
            const result = await SettingsModel.findOne({_id}).exec() 
            switch (uploadType) {
                case 'favicon':
                    if(result){
                    result.companyDetails!.favicon! = file.filename
                    result?.save()
                    res.status(200).json({messsage:'success'}); 
                 }   
                    break;
                case 'logo':
                    if(result){
                    result.companyDetails!.logo! = file.filename
                    result?.save()
                    res.status(200).json({messsage:'success'}); 
                 }   
                    break;
                case 'darklogo':
                    if(result){
                    result.companyDetails!.logoDark! = file.filename
                    result?.save()
                    res.status(200).json({messsage:'success'}); 
                 }   
                    break;
                case 'pageBg':
                    if(result){
                    result.companyDetails!.pagesBg! = file.filename
                    result?.save()
                    res.status(200).json({messsage:'success'}); 
                 }   
                    break;
                case 'bgImage':
                    if(result){
                    result.companyDetails!.backgroundImage! = file.filename
                    result?.save()
                    res.status(200).json({messsage:'success'}); 
                 }   
                    break;
                case 'aboutUsBg':
                    if(result){
                    result.companyDetails!.aboutUsBg! = file.filename
                    result?.save()
                    res.status(200).json({messsage:'success'}); 
                 }   
                    break;
            
                default:
                    return res.status(400).json({message:'Bad Request'})
                    break;
            }
            // console.log(Object.keys(files))
            // console.log(Object.values(files))
            // console.log(files.upload)
//             Object.keys(files['upload']).forEach((key:any)=>{
//                 const {path,mimetype}= files['upload'][key]
//    const img = fs.readFileSync(path)
// const encode_img = img.toString('base64')
    // console.log(encode_img)              
// const finalImg = {
//     ContentType:mimetype,
//     image:Buffer.from(encode_img,'base64')
// }     
//     })   
        } catch (error) {
        //    next(error) 
        console.log(error)
        }

}
}





}

export default new SettingsController();