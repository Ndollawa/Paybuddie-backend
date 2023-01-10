import {Request,Response, NextFunction} from 'express'

 const verifyRoles = (...allowedRoles:any) =>{
    return(req:Request, res:Response, next:NextFunction)=>{
     
     const roles = req.roles;
        if(!roles)return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        console.log(roles);
      const  result = roles.map((role:number) => rolesArray.includes(role)).find((val:boolean) => val === true);
        if(!result) return res.sendStatus(401);
        next();
    }

 }

export default  verifyRoles;