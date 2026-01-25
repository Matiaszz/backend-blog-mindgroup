import { PrismaClient } from "@prisma/client";
import { AppError } from "../error/AppError";
import { getPostSelect, LogCreationDTO, LogResponseDTO, userPublicSelect } from "../schemas/dtos";

const db = new PrismaClient();

export async function createLog(userId: string, dto: LogCreationDTO){
    if (!dto.action || !dto.postId){
        throw new AppError('Invalid data, must contain action and postId', 400);
    }

    const log = await db.log.create({data: {
        postId: dto.postId,
        userId: userId,
        action: dto.action
    }, select: {
        id: true,
        action: true,
        createdAt: true,
        user: {
            select: userPublicSelect
        },
        post: {
            select: getPostSelect()
        }

    }});

    return log as LogResponseDTO;
}

export async function getLatestActivites(
  userId: string,
  quantity = 5
): Promise<LogResponseDTO[]> {
  const logs = await db.log.findMany({
    where: { userId },
    take: quantity,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      action: true,
      createdAt: true,

      user: {
        select: userPublicSelect,
      },

      post: {
        select: getPostSelect(),
      },
    },
  });

  return logs as LogResponseDTO[];
}
