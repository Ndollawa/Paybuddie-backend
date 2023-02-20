import express, {Request,Response , NextFunction } from 'express';
const router = express.Router();
import path  from 'path';
import ROLES_LIST  from '../../../config/roleList';
import verifyRoles  from '../../Http/Middleware/verifyRoles';
import MessagesController from '../../Http/Controllers/MessagesController';
import verifyJWT from '../../Http/Middleware/verifyJWT';





router.route('/')
.get(verifyJWT, verifyRoles(ROLES_LIST.USER),(req:Request, res:Response, next:NextFunction) => MessagesController.list(req,res))
.post(verifyJWT, verifyRoles(ROLES_LIST.USER),(req:Request, res:Response, next:NextFunction) => MessagesController.create(req,res))
.patch(verifyJWT, verifyRoles(ROLES_LIST.USER),(req:Request, res:Response, next:NextFunction) => MessagesController.update(req,res))
.delete(verifyJWT, verifyRoles(ROLES_LIST.USER),(req:Request, res:Response, next:NextFunction) => MessagesController.delete(req,res))


router.route('/:id')
.get((req, res, next) => MessagesController.read(req, res, next))
// .post(verifyJWT, verifyRoles(ROLES_LIST.USER), (req:Request, res:Response, next:NextFunction) => PostHandler.update(req, res))
// .put(verifyJWT, verifyRoles(ROLES_LIST.USER), (req:Request, res:Response, next:NextFunction) => PostHandler.update(req, res))
// .delete(verifyJWT, verifyRoles(ROLES_LIST.USER), (req:Request, res:Response, next:NextFunction) => PostHandler.delete(req, res))
router.route('/upload')
.get((req, res, next) => MessagesController.read(req, res, next))
// .post(verifyJWT, verifyRoles(ROLES_LIST.USER), (req:Request, res:Response, next:NextFunction) => MessagesController.uploadUserImage(req, res))
// .put(verifyJWT, verifyRoles(ROLES_LIST.USER), (req:Request, res:Response, next:NextFunction) => MessagesController.uploadUserImage(req, res))
// .delete(verifyJWT, verifyRoles(ROLES_LIST.USER), (req:Request, res:Response, next:NextFunction) => PostHandler.delete(req, res))


export default router; 

