import { PrismaClient } from "@prisma/client";
import { UserLoginDTO, UserRegisterDTO, UserResponseDTO } from "../schemas/dtos";
import { AppError } from "../error/AppError";
import {sign} from 'jsonwebtoken';
import bc from 'bcrypt';

const db = new PrismaClient();
const secret = process.env.JWT_SECRET;

export async function register(data: UserRegisterDTO) {
    const userExist = await db.user.findUnique({where: {
        email: data.email
    }});

    if (userExist) throw new AppError('Email já cadastrado.', 409);

    const hash = await bc.hash(data.password, 10);
    const user = await db.user.create({data: {
        ...data,
        password: hash
    }});    

    return user as UserResponseDTO;
}

export async function Login(data: UserLoginDTO) {
    const userExist = await db.user.findUnique({where: {
        email: data.email
    }});

    if (!userExist) throw new AppError('Usuário não encontrado.', 404);

    const isCorrect = await bc.compare(data.password, userExist.password);

    if (!isCorrect) {
        throw new AppError('Credenciais incorretas', 401);
    }

    const token = sign(userExist as UserResponseDTO, secret ?? 'secret', {
        subject: userExist.id,
        expiresIn: '3d'
    });

    return token;
}