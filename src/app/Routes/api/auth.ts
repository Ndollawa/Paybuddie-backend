import  express ,{Response,Request,NextFunction} from 'express';
const router = express.Router();
import path from 'path';
import AuthController from '../../Http/Controllers/AuthController';
import RegisterController  from '../../Http/Controllers/RegisterController';

router.route('/')
.post((req:Request, res:Response,next:NextFunction)=>AuthController.login(req,res));
router.route('/login')
.post((req:Request, res:Response,next:NextFunction)=>AuthController.login(req,res));

router.route('/logout')
.get((req:Request, res:Response,next:NextFunction)=>AuthController.logout(req,res));

router.route('/refresh')
// .get((req:Request, res:Response,next:NextFunction)=>RegisterController.index(req,res))
.get((req:Request, res:Response,next:NextFunction)=>AuthController.refreshTokenHandler(req,res));

router.route('/register')
.get((req:Request, res:Response,next:NextFunction)=>RegisterController.index(req,res))
.post((req:Request, res:Response,next:NextFunction)=>RegisterController.register(req,res))


export default router;  