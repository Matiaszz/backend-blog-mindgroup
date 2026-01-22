import { Request, Response } from "express";
import { UserLoginSchema, UserRegisterSchema } from "../schemas/dtos";
import { Login, register } from "../services/authService";

export async function registerController(req: Request, res: Response) {
    const parsed = UserRegisterSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
        errors: parsed.error.flatten().fieldErrors,
        });
    }

    const user = await register(parsed.data);

    return res.status(201).json({
        message: "User created successfully",
        data: user
    });
}

export async function loginController(req: Request, res: Response) {
    const parsed = UserLoginSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
        errors: parsed.error.flatten().fieldErrors,
        });
    }

    const token = await Login(parsed.data);
    return res.cookie('auth', token).status(204).end();
}

export async function logoutController(req: Request, res: Response) {
    return res.clearCookie('auth').end();
}
