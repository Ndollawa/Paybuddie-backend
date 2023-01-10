import dotenv from 'dotenv'
dotenv.config(); 

import express, { Application } from "express";
import path from 'path';
import cors from 'cors';
// import {fileURLToPath} from 'url';
import { logger } from './src/app/Http/Middleware/logEvents';
import errorHandler from './src/app/Http/Middleware/errorHandler';
import corsOptions from './src/config/corsOptions';
import verifyJWT from './src/app/Http/Middleware/verifyJWT';
import cookieParser from 'cookie-parser';
import credentials from './src/app/Http/Middleware/credentials';
import mongoose from 'mongoose';
import connectDB from './src/config/dbConn';
import SettingsRoutes from './src/app/Routes/api/settings'
// import PostRoutes from './src/app/Routes/api/post';
// import UserRoutes from './src/app/Routes/api/user';
import RefreshRoute from './src/app/Routes/api/refresh';
// import RegisterRoutes from './src/app/Routes/api/register';
import AuthRoutes from './src/app/Routes/api/auth';
// import AuthController from './src/app/Http/Controllers/AuthController';
// import RegisterController from './src/app/Http/Controllers/RegisterController';
// import  PostModel from './src/app/Models/Post';
import CheckDuplicateRoutes from './src/app/Http/Controllers/DuplicateController';
import { Seed } from './src/app/Seeders/Seeder';

// const __filename = fileURLToPath(import.meta.url);

// 
// const __dirname = path.dirname(__filename);

// connect to Database
connectDB();

const app:Application = express();
const PORT:string |number | undefined = process.env.PORT || 3500

// custom middleware logger
app.use(logger);

//Handle credentials check before cors
app.use(credentials);

//Cross origin Resource Sharing
app.use(cors(corsOptions));


// built-in middleware to handle urlencodedn data
//in other words, form data
//content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({extended:false}));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());
//set view engine to ejs
// app.set("view engine",'ejs');
// app.use(express.static(path.join(__dirname, '/public')));
///routes

//server static files
// app.get("^/$|/index(.html)?", (req, res, next)=>{

//     res.render(path.join(__dirname,'views','index'), {posts:PostModel} );
// });



app.use('/checkduplicate', CheckDuplicateRoutes);
app.use('/auth',AuthRoutes);

// //post routes
// app.use('/post', PostRoutes);


// app.use(verifyJWT);
//user routes
app.use('/settings', SettingsRoutes);
app.all('*',(req,res)=>{
    res.sendStatus(404);
    ;
});

// custom middleware for handling errors
app.use(errorHandler);

mongoose.connection.once('open',()=>{
    console.log('Connected to MongoDB');
    // Seed();
    app.listen(PORT, ()=>console.log(`Server running on Port ${PORT}`));

});
