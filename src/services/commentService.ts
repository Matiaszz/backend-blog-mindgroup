import { PrismaClient } from "@prisma/client";
import { AppError } from "../error/AppError";
import { CommentCreateDTO, CommentLikeResponseDTO, CommentResponseDTO } from "../schemas/dtos";
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

export async function toggleCommentLike(userId: string, {commentId}: {commentId: number}) {
  if (!userId) throw new AppError('User not found', 404);
  if (!commentId) throw new AppError('Comment not found', 404);

  const res = await db.$transaction(async (tx) => {
    const comment = await tx.comment.findUnique({where: {
      id: commentId
    }});

    if  (!comment) throw new AppError('Post not found', 404);

    const favorite = await tx.commentLike.findUnique({where: {
      commentId_userId: {
        commentId,
        userId
      }
    }});

    if (!favorite){
      const create = await tx.commentLike.create({
        data: {
          commentId,
          userId,
          postId: comment.postId
        }, select: {
          id: true,
          commentId: true,
          userId: true
        }
      });

      return {...create as CommentLikeResponseDTO, commentLiked: true };
    }

    const deleteFavorite = await tx.commentLike.delete({
      where: {
        commentId_userId: {
          commentId,
          userId
        }
      }
    });

    return {...deleteFavorite as CommentLikeResponseDTO, commentLiked: false };
  });

  return res as CommentLikeResponseDTO;
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