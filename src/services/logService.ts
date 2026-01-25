import { PrismaClient } from "@prisma/client";
import { AppError } from "../error/AppError";
import { LogCreationDTO, LogResponseDTO } from "../schemas/dtos";

const db = new PrismaClient();

export async function createLog(userId: string, dto: LogCreationDTO){
    if (!dto.action || !dto.postId){
        throw new AppError('Invalid data, must contain action and postId', 400);
    }

    const log = await db.log.create({data: {
        postId: dto.postId,
        userId: userId,
        action: dto.action
    }});

    return log as LogResponseDTO;
}

export async function getLatestActivites(userId: string, quantity: number){
    const logs = await db.log.findMany({
        where: {userId},
        take: quantity ?? 5
    });

    return logs as LogResponseDTO[];
}
