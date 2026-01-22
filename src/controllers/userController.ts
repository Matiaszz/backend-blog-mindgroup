import { Request, Response } from "express";
import {  UserResponseDTO } from "../schemas/dtos";
import { AppError } from "../error/AppError";
import { getMe } from "../services/userService";


export async function getUserController(req: Request, res: Response) {
    if(!req.user){
        throw new AppError('Você não está autenticado', 401);
    }

    const user: UserResponseDTO = await getMe(req.user.id);
    return res.status(200).json({user});
}