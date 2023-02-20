import express, {Request,Response , NextFunction } from 'express';
const router = express.Router();
import path  from 'path';
import ROLES_LIST  from '../../../config/roleList';
import verifyRoles  from '../../Http/Middleware/verifyRoles';
import SliderController from '../../Http/Controllers/SliderController';






router.route('/')
.get((req:Request, res:Response, next:NextFunction) => SliderController.list(req,res,next))
.post((req:Request, res:Response, next:NextFunction) => SliderController.create(req,res))
.put((req:Request, res:Response, next:NextFunction) => SliderController.update(req,res))
.delete((req:Request, res:Response, next:NextFunction) => SliderController.delete(req,res))
export default router; 

