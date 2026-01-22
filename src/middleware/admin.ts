import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../error/AppError";
import { UserResponseDTO } from "../schemas/dtos";

export function ensureAuthenticated(
  req: Request,
  _res: Response,
  next: NextFunction
) {

    if(req.user?.accountType === 'USER') throw new AppError("Você não está autorizado a acessar esta página.", 403);

    return next();
  
}
