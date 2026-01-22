import { Request, Response } from "express";
import { UserRegisterSchema } from "../schemas/dtos";
import { register } from "../services/authService";

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