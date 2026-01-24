import { PrismaClient } from "@prisma/client";
import { AppError } from "../error/AppError";
import { CommentCreateDTO, CommentResponseDTO } from "../schemas/dtos";
import { dmmfToRuntimeDataModel } from "@prisma/client/runtime/library";

const db = new PrismaClient();


export async function createComment(userId: string, dto: CommentCreateDTO) {
    if (!userId) throw new AppError('User not found', 404);
    const comment = await db.comment.create({
        data: {
            content: dto.content,
            userId: userId,
            postId: dto.postId
        }, select: getCommentSelect()

    });

    return comment as CommentResponseDTO;
}


function getCommentSelect(){
    return {
        id: true,
        content: true,
        user: {
            select: {
                id: true,
                name: true,
                email: true,
                accountType: true,
            }
        },
        commentLikes: {
            select: {
                id: true,
                userId: true,
                commentId: true,
                postId: true
            }
        },
        createdAt: true

    }
}