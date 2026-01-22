import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../error/AppError";
import { UserResponseDTO } from "../schemas/dtos";

export function ensureAuthenticated(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const token = req.cookies?.auth;

  if (!token) {
    throw new AppError("Não autenticado", 401);
  }

  try {
    const decoded = verify(
      token,
      process.env.JWT_SECRET ?? "secret"
    ) as UserResponseDTO;

    req.user = {
      id: decoded.id,
      email: decoded.email,
      accountType: decoded.accountType
    };

    return next();
  } catch {
    throw new AppError("Token inválido ou expirado", 401);
  }
}
