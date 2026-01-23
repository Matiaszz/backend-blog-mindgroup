import { PrismaClient } from "@prisma/client";
import { AppError } from "../error/AppError";
import { UserResponseDTO } from "../schemas/dtos";

const db = new PrismaClient();

export async function getMe(id: string) {
    const user = await db.user.findUnique({where: {id}, select: {
      id: true,
      name: true,
      email: true,
      biography: true,
      profilePictureUrl: true,
      accountType: true,
      createdAt: true,
    }
  });
    if (!user) throw new AppError('Usuário não encontrado', 404);
    return user as UserResponseDTO;
}