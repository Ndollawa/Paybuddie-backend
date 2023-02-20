import  UserModel from '../../Models/User';
import bcrypt from 'bcrypt';
// import {fileURLToPath} from 'url';
import { Request, Response } from 'express';
import BaseController from './BaseController';

class UsersController extends BaseController{
    constructor(){
        super(UserModel)   

   }
// @desc Get all users
// @route GET /users
// @access Private
public list = async (req:Request, res:Response) => {
    // Get all users from MongoDB
    const users = await UserModel.find().select('-password').lean()

    // If no users 
    if (!users?.length) {
        return res.status(200).json({ message: 'No users found' })
    }

    res.json(users)
}

// @desc Create new user
// @route POST /users
// @access Private
public create = async (req:Request, res:Response) => {
    const {email, username, password, roles } = req.body

    // Confirm data
    if (!email || !username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const duplicate = await UserModel.findOne({ username } || {email}).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = (!Array.isArray(roles) || !roles.length)
        ? { email, username, "password": hashedPwd }
        : { email, username, "password": hashedPwd, roles }

    // Create and store new user 
    const user = await UserModel.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
}

// @desc Update a user
// @route PATCH /users
// @access Private
public update = async (req:Request, res:Response) => {
    const { _id,type, data } = req.body
    console.log(req.body)
switch (type) {
    case 'passwordUpdate':
        const {password} = req.body
        // Hash password 
        const hashedPwd = await bcrypt.hash(password, 10) // salt rounds
        await UserModel.findByIdAndUpdate(_id,{password:hashedPwd},{new:true})
        res.status(200).json({message:'success'})   
        break;
    case 'profileUpdate':
        await UserModel.findByIdAndUpdate(_id,data,{new:true})
        res.status(200).json({message:'success'})
        break;

    default:
        res.status(400).json({message:'Bad Request'})
        break;
}
   
}

// @desc Update a user
// @route PATCH /users
// @access Private
public uploadUserImage = async (req:Request, res:Response) => {
    const { _id,type, data } = req.body
    console.log(req.files)
    console.log(req.body)
switch (type) {
    case 'passwordUpdate':
        const {password} = req.body
        // Hash password 
        const hashedPwd = await bcrypt.hash(password, 10) // salt rounds
        await UserModel.findByIdAndUpdate(_id,{password:hashedPwd},{new:true})
        res.status(200).json({message:'success'})   
        break;
    case 'profileUpdate':
        await UserModel.findByIdAndUpdate(_id,data,{new:true})
        res.status(200).json({message:'success'})
        break;

    default:
        res.status(400).json({message:'Bad Request'})
        break;
}
   
}

// @desc Delete a user
// @route DELETE /users
// @access Private
public delete = async (req:Request, res:Response) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // // Does the user still have assigned notes?
    // const note = await Note.findOne({ user: id }).lean().exec()
    // if (note) {
    //     return res.status(400).json({ message: 'User has assigned notes' })
    // }

    // Does the user exist to delete?
    const user = await UserModel.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
}
public upload = async(req:Request, res:Response)=>{
    const {uploadType} = req.params
    const {_id} = req.body
    const file = req?.file!
    switch (uploadType) {
        case 'avatar':
            if(!file)return res.status(400).json({message:'No file uploded'})
            await UserModel.findByIdAndUpdate(_id,{userImage:file.filename},{new:true})
            res.status(200).json({message:'success'})
            
            break;
    
        default:
            res.status(400).json({message:'Bad Request'})
            break;
    } 
}


}
export default new UsersController()



//   const upload = multer({ dest: path.join(__dirname, 'uploads') }); 
//   // Set configuration options 
//   const uploadPath = path.join(__dirname, 'uploads'); 
//   const acceptedFileTypes = ["image/jpg", "image/gif"];
//    const acceptedFileSize = 10;
//    // 10 MB // Create new file upload object 
//    const fileUpload = new FileUpload(uploadPath, acceptedFileTypes, acceptedFileSize);
//     // Set the route 
//     app.post('/upload', upload.single('uploadedFile'), fileUpload.multerErrorHandler, fileUpload.uploadFile);
    