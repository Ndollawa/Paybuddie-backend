import express,{Response,Request,NextFunction} from 'express';
const router = express.Router();
import verifyJWT from '../../Http/Middleware/verifyJWT';
// import path from 'path';
import ROLES_LIST from '../../../config/roleList';
import verifyRoles from '../../Http/Middleware/verifyRoles';

import FaqController from '../../Http/Controllers/FaqController';




router.route('/')
.get((req:Request, res:Response, next:NextFunction) => FaqController.selectAll(req, res))
.post(verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req:Request, res:Response, next:NextFunction) => FaqController.create(req, res))
.patch(verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req:Request, res:Response, next:NextFunction) => FaqController.update(req, res))
.delete(verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req:Request, res:Response, next:NextFunction) => FaqController.delete(req, res));


// router.route('/search/:q').get((req, res, next) => FaqController.search(req, res, next));
// router.route('/author/:author/').get((req, res, next) => FaqController.showFaqByAuthor(req, res, next));


// router.route('/:id/')
// .get((req, res, next) => FaqController.show(req, res, next))
// .Faq(verifyJWT, verifyRoles(ROLES_LIST.ADMIN), (req:Request, res:Response, next:NextFunction) => FaqController.update(req, res))
// .put(verifyJWT, verifyRoles(ROLES_LIST.ADMIN), (req:Request, res:Response, next:NextFunction) => FaqController.update(req, res))
// .delete(verifyJWT, verifyRoles(ROLES_LIST.ADMIN), (req:Request, res:Response, next:NextFunction) => FaqController.delete(req, res))




export default  router; 