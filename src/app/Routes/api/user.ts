import express, {Request,Response , NextFunction } from 'express';
const router = express.Router();
import path  from 'path';
import ROLES_LIST  from '../../../config/roleList';
import verifyRoles  from '../../Http/Middleware/verifyRoles.js';
// import UserController from '../../Http/Controllers/UserController';






router.route('/')
// .get((req:Request, res:Response, next:NextFunction) => UserController.index)
// .post((req:Request, res:Response, next:NextFunction) => UserController.create)
// .put((req:Request, res:Response, next:NextFunction) => UserController.update)
// .delete((req:Request, res:Response, next:NextFunction) => UserController.delete)
export default router; 

