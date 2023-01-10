import  express,{Response,Request,NextFunction} from 'express';
const router = express.Router();
import path from 'path';
import AuthController from '../../Http/Controllers/AuthController';

router.route('/')
.post((req:Request, res:Response,next:NextFunction)=>AuthController.checkDuplicate)

export default router;  