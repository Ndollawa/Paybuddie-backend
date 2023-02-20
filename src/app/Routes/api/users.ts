import express, {Request,Response , NextFunction } from 'express';
const router = express.Router();
import useMulter from '../../utils/useMulter';
import ROLES_LIST  from '../../../config/roleList';
import verifyRoles  from '../../Http/Middleware/verifyRoles';
import UsersController from '../../Http/Controllers/UsersController';
import verifyJWT from '../../Http/Middleware/verifyJWT';


const upload = useMulter('users')


router.route('/')
.get(verifyJWT, verifyRoles(ROLES_LIST.USER),(req:Request, res:Response, next:NextFunction) => UsersController.list(req,res))
.post(verifyJWT, verifyRoles(ROLES_LIST.USER),(req:Request, res:Response, next:NextFunction) => UsersController.create(req,res))
.patch(verifyJWT, verifyRoles(ROLES_LIST.USER),(req:Request, res:Response, next:NextFunction) => UsersController.update(req,res))
.delete(verifyJWT, verifyRoles(ROLES_LIST.USER),(req:Request, res:Response, next:NextFunction) => UsersController.delete(req,res))


router.route('/:id')
.get((req, res, next) => UsersController.read(req, res, next));
// .post(verifyJWT, verifyRoles(ROLES_LIST.USER), (req:Request, res:Response, next:NextFunction) => PostHandler.update(req, res))
// .put(verifyJWT, verifyRoles(ROLES_LIST.USER), (req:Request, res:Response, next:NextFunction) => PostHandler.update(req, res))
// .delete(verifyJWT, verifyRoles(ROLES_LIST.USER), (req:Request, res:Response, next:NextFunction) => PostHandler.delete(req, res))
router.route('/uploads/:uploadType')
.post(verifyJWT, verifyRoles(ROLES_LIST.USER),upload.single('avatar'), (req:Request, res:Response, next:NextFunction) => UsersController.upload(req, res))
.put(verifyJWT, verifyRoles(ROLES_LIST.USER), upload.single('avatar'),(req:Request, res:Response, next:NextFunction) => UsersController.upload(req, res))
// .delete(verifyJWT, verifyRoles(ROLES_LIST.USER), (req:Request, res:Response, next:NextFunction) => PostHandler.delete(req, res))


export default router; 

