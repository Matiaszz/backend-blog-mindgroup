import { PrismaClient } from "@prisma/client";
import { AppError } from "../error/AppError";
import { UserPublicDTO, UserRegisterDTO, UserResponseDTO, UserUpdateDTO } from "../schemas/dtos";
import { dmmfToRuntimeDataModel } from "@prisma/client/runtime/library";

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

export async function updateUser(userId: string, dto: UserUpdateDTO): Promise<UserPublicDTO> {
  if (!userId) throw new AppError('User not found', 404);

  const user = await db.user.update({where: {
    id: userId

  }, data: {
    name: dto.name ?? '',
    email: dto.email ?? '',
    biography: dto.biography ?? '',
    profilePictureUrl: dto.profilePictureUrl ?? ''

  }, select: {
    id: true,
    name: true,
    email: true,
    biography: true,
    profilePictureUrl: true
  }});

  if (!user) throw new AppError('User not found', 404)

  return user as UserPublicDTO;
}