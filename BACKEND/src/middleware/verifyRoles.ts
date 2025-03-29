import { NextFunction, Request, RequestHandler, Response } from "express";

const verifyRoles = (...allowedRoles: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    
    if(!req?.roles){
      res.status(401).json({ message: "Unauthorized" });
      return 
    }

    const rolesArray = [...allowedRoles];

    console.log("Required roles", rolesArray)
    console.log("Request roles", req.roles)

    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);

    if(!result){
      res.status(401).json({ message: "Unauthorized" });
      return
    }
    
    next()
  }
}

export default verifyRoles;