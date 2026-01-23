import { Request, Response, NextFunction } from "express";
import { AppError } from "../error/AppError";

export function ensureIsAdmin(
  req: Request,
  _res: Response,
  next: NextFunction
) {
    if(req.user?.accountType === 'USER') throw new AppError("Você não está autorizado a acessar esta página.", 403);

    return next();
  
}
