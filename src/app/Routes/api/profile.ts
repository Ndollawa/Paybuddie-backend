import express, {Request,Response , NextFunction } from 'express';
const router = express.Router();
import path  from 'path';
import ROLES_LIST  from '../../../config/roleList';
import verifyRoles  from '../../Http/Middleware/verifyRoles';
// import ProfileController from '../../Http/Controllers/ProfileController';






router.route('/')
// .get((req:Request, res:Response, next:NextFunction) => ProfileController.index)
// .post((req:Request, res:Response, next:NextFunction) => ProfileController.create)
// .put((req:Request, res:Response, next:NextFunction) => ProfileController.update)
// .delete((req:Request, res:Response, next:NextFunction) => ProfileController.delete)
export default router; 

