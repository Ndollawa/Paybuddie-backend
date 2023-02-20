import dotenv from 'dotenv';
import express, { Application } from "express";
// import fileUpload from 'express-fileupload';
import { Server,createServer } from "http"; 
import socketIO, { Server as SocketIOServer, Socket } from "socket.io";  
import path from 'path';
import cors from 'cors';
import  'express-async-errors';
// import { logger } from './src/app/Http/Middleware/logEvents';
import errorHandler from './src/app/Http/Middleware/errorHandler';
import corsOptions from './src/config/corsOptions';
import verifyJWT from './src/app/Http/Middleware/verifyJWT';
import cookieParser from 'cookie-parser';
import credentials from './src/app/Http/Middleware/credentials';
import mongoose from 'mongoose';
import connectDB from './src/config/dbConn';
import SettingsRoutes from './src/app/Routes/api/settings'
import FaqsRoutes from './src/app/Routes/api/faq';
import SlidersRoutes from './src/app/Routes/api/slider';
import ProfileRoutes from './src/app/Routes/api/profile';
import UsersRoutes from './src/app/Routes/api/users';
import MessagesRoutes from './src/app/Routes/api/messages';
// import RegisterRoutes from './src/app/Routes/api/register';
import AuthRoutes from './src/app/Routes/api/auth';
// import AuthController from './src/app/Http/Controllers/AuthController';
// import RegisterController from './src/app/Http/Controllers/RegisterController';
// import  PostModel from './src/app/Models/Post';
import CheckDuplicateRoutes from './src/app/Http/Controllers/DuplicateController';
import { Seed } from './src/app/Seeders/Seeder';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


dotenv.config(); 

// connect to Database
connectDB();

const app:Application = express();
const PORT:string |number | undefined = process.env.PORT || 3500;

// custom middleware logger
// app.use(logger);

//Handle file uploads
// app.use(fileUpload({ createParentPath: true }));

//Handle credentials check before cors
app.use(credentials);


//Cross origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencodedn data
//in other words, form data
//content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());
//set view engine to ejs
// app.set("view engine",'ejs');
app.use(express.static(path.join(__dirname, '/public')));
///routes

//server static files
// app.get("^/$|/index(.html)?", (req, res, next)=>{

//     res.render(path.join(__dirname,'views','index'), {posts:PostModel} );
// });

// const server = new Server(app); 
const server = createServer(app); 
const io = new SocketIOServer(server,{
    cors:{
        origin:'*',
        methods:['GET','POST']
    }
    });
 //Handle private chat 
 io.on("connection", (socket:Socket) => {
    // console.log(socket)
     socket.on("privateMessage", (data) => { 
        const { sender, receiver, message } = data;
        console.log(data)
        io.to(receiver).emit("message", { sender, message }); 
            }); 

    //Handle group chat 
    socket.on("joinGroup", (groupName:string) => { 
        socket.join(groupName);
         socket.on("groupMessage", (message) => {
             io.to(groupName).emit("groupMessage", message); 
            });
         });
    socket.on('disconnect',(socket)=>{
        console.log(`User disconnected: ${socket}`)
    })
        });
        

    //Start the server 
    server.listen(3501, () => { console.log(`Realtime Server listening on port 3501`);
 })
  
app.use('/checkduplicate', CheckDuplicateRoutes);
app.use('/auth',AuthRoutes);
app.use('/sliders', SlidersRoutes);
app.use('/users', UsersRoutes);

// //post routes
// app.use('/post', PostRoutes);


//user routes
app.use('/settings', SettingsRoutes);

app.use(verifyJWT);
app.use('/faqs', FaqsRoutes);
app.use('/profile', ProfileRoutes);
app.all('*',(req,res)=>{
    res.status(404).json({message: 'Resource not Found!'});
});

// custom middleware for handling errors
app.use(errorHandler);

mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB');
    // Seed();
    app.listen(PORT, ()=>console.log(`Server running on Port ${PORT}`));

});
