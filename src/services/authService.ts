import { PrismaClient } from "@prisma/client";
import { UserRegisterDTO, UserResponseDTO } from "../schemas/dtos";
import { AppError } from "../error/AppError";
import bc from 'bcrypt';

const db = new PrismaClient();

export async function register(data: UserRegisterDTO) {
    const userExist = await db.user.findUnique({where: {
        email: data.email
    }});

    if (userExist) throw new AppError('Email already exist.', 409);

    const hash = await bc.hash(data.password, 10);
    const user = await db.user.create({data: {
        ...data,
        password: hash
    }});

    return user as UserResponseDTO;
}