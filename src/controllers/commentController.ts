import { Request, Response } from "express";
import { CommentCreateDTO, CommentCreateSchema } from "../schemas/dtos";
import { createComment } from "../services/commentService";


export async function createCommentController(req: Request, res: Response) {
    const parsed = CommentCreateSchema.safeParse(req.body);

    if (!parsed.success){
        return res.status(400).json({
            errors: parsed.error.flatten().fieldErrors
        });
    }

    const comment = await createComment(req.user?.id ?? '', req.body as CommentCreateDTO);
    return res.status(201).json(comment);
}