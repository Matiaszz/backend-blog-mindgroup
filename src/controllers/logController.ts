import { Request, Response } from "express";
import { AppError } from "../error/AppError";
import { LogCreationDTO, LogCreationSchema, LogResponseDTO } from "../schemas/dtos";
import { createLog, getLatestActivites } from "../services/logService";

export async function getLatestActivitesController(req: Request, res: Response) {
    if(!req.user){
        throw new AppError('Você não está autenticado', 401);
    }

    const logs: LogResponseDTO[] = await getLatestActivites(req.user.id, 5);
    return res.json(logs);    
}