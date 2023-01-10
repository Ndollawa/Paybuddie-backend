import express,{Response,Request,NextFunction} from 'express';
const router = express.Router();
import verifyJWT from '../../Http/Middleware/verifyJWT';
// import path from 'path';
import ROLES_LIST from '../../../config/roleList';
import verifyRoles from '../../Http/Middleware/verifyRoles.js';

import PostController from '../../Http/Controllers/PostController';



let PostHandler = new PostController();

router.route('/')
.get((req:Request, res:Response, next:NextFunction) => PostHandler.index(req, res))
.post(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req:Request, res:Response, next:NextFunction) => PostHandler.create(req, res))
.put(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req:Request, res:Response, next:NextFunction) => PostHandler.update(req, res))
.delete(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req:Request, res:Response, next:NextFunction) => PostHandler.delete(req, res));


router.route('/search/:q').get((req, res, next) => PostHandler.search(req, res, next));
router.route('/author/:author/').get((req, res, next) => PostHandler.showPostByAuthor(req, res, next));


router.route('/:id/')
.get((req, res, next) => PostHandler.show(req, res, next))
.post(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.Editor, ROLES_LIST.Author), (req:Request, res:Response, next:NextFunction) => PostHandler.update(req, res))
.put(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.Editor, ROLES_LIST.Author), (req:Request, res:Response, next:NextFunction) => PostHandler.update(req, res))
.delete(verifyJWT, verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.Editor, ROLES_LIST.Author), (req:Request, res:Response, next:NextFunction) => PostHandler.delete(req, res))




export default  router; 