import { Request, Response } from "express";
import {  UserPublicDTO, UserResponseDTO, UserUpdateDTO, UserUpdateSchema } from "../schemas/dtos";
import { AppError } from "../error/AppError";
import { getMe, updateUser } from "../services/userService";


export async function getUserController(req: Request, res: Response) {
    if(!req.user){
        throw new AppError('Você não está autenticado', 401);
    }

    const user: UserResponseDTO = await getMe(req.user.id);
    return res.json(user);
}

export async function updateUserController(req: Request, res: Response) {
    if(!req.user){
        throw new AppError('Você não está autenticado', 401);
    }
    
    const parsed = UserUpdateSchema.safeParse(req.body);
    console.warn(parsed);
    if (!parsed.success) return res.status(400).json(parsed.error.flatten().formErrors);

    const user: UserPublicDTO = await updateUser(req.user.id, req.body as UserUpdateDTO);
    return res.json(user);    
}