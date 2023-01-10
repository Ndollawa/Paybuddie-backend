import express,{Response,Request,NextFunction} from 'express';
const router = express.Router();
import verifyJWT from '../../Http/Middleware/verifyJWT';
// import path from 'path';
import ROLES_LIST from '../../../config/roleList';
import verifyRoles from '../../Http/Middleware/verifyRoles';

import SettingsController from '../../Http/Controllers/SettingsController';





router.route('/')
.get((req:Request, res:Response, next:NextFunction) => SettingsController.index(req, res))
.post(verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req:Request, res:Response, next:NextFunction) => SettingsController.createSettings(req, res))
.put(verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req:Request, res:Response, next:NextFunction) => SettingsController.deleteSettings(req, res));

router.route('/homepage-config')
.post(verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req:Request, res:Response, next:NextFunction) => SettingsController.updateHomepageSettings(req, res));

router.route('/general')
.post(verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req:Request, res:Response, next:NextFunction) => SettingsController.updateGeneralSettings(req, res));

router.route('/pages')
.post(verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.DEV), (req:Request, res:Response, next:NextFunction) => SettingsController.updatePagesSettings(req, res));

router.route('/dashboard-config')
.get((req:Request, res:Response, next:NextFunction) => SettingsController.index(req, res))
.post((req:Request, res:Response, next:NextFunction) => SettingsController.updateDashboardSettings(req, res));




export default  router; 