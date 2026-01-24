import { z } from "zod";
import { AccountType, CommentLike, Post } from "@prisma/client";

/* =========================
   USER
========================= */

// Register
export const UserRegisterSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.email("Email inválido"),
  password: z.string().min(6, "Senha muito curta"),
});

export type UserRegisterDTO = z.infer<typeof UserRegisterSchema>;

// Login
export const UserLoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type UserLoginDTO = z.infer<typeof UserLoginSchema>;

export type UserResponseDTO = {
  id: string;
  name: string;
  email: string;
  profilePictureUrl: string;
  biography?: string | null;
  accountType: AccountType;
  createdAt: Date;
};


export const CategoryCreateSchema = z.object({
  label: z.string().min(2),
});

export type CategoryCreateDTO = z.infer<typeof CategoryCreateSchema>;

export type CategoryResponseDTO = {
  id: number;
  label: string;
};

export const PostCreateSchema = z.object({
  title: z.string().min(3),
  summary: z.string().min(10),
  content: z.string().min(20),
  tags: z.array(z.string().min(1)),
  categoryId: z.number(),
});

export type PostCreateDTO = z.infer<typeof PostCreateSchema>;

export type UserPublicDTO = {
  id: string;
  name: string;
  email: string;
  profilePictureUrl: string | null;
};


export type PostResponseDTO = {
  id: string;
  title: string;
  summary: string;
  content: string;
  published: boolean;
  views: number;
  averageReadTimeInMinutes: number;
  likes: LikeResponseDTO[];
  favorites: FavoriteResponseDTO[];
  comments: CommentResponseDTO[];
  createdAt: Date;
  author: UserPublicDTO;
  category: CategoryResponseDTO;
};


export type TagRequestDTO = {
  value: string;
}

export type TagResponseDTO = {
  id: number;
  name: string;
}

export const CommentCreateSchema = z.object({
  postId: z.uuid(),
  content: z.string().min(1),
});

export type CommentCreateDTO = z.infer<typeof CommentCreateSchema>;

export type CommentResponseDTO = {
  id: number, 
  content: string,
  user: UserResponseDTO,
  commentLikes: CommentLike[]
}

export const CommentLikeCreateSchema = z.object({
  postId: z.uuid(),
  commentId: z.int(),
});

export type CommentLikeDTO = z.infer<typeof CommentLikeCreateSchema>;

export type CommentLikeResponseDTO = {
  id: number,
  userId: string,
  postId: string,
  commentId: number
}

export type LogResponseDTO = {
  id: number;
  action: string;
  createdAt: Date;
  userId: string;
  postId: string;
};

export const LikeCreationSchema = z.object({
  postId: z.uuid(),
});


export type LikeCreateDTO = z.infer<typeof LikeCreationSchema>;

export type LikeResponseDTO = {
  id: number,
  userId: string,
  postId: string
}

export const FavoriteCreationSchema = z.object({
  postId: z.uuid(),
});


export type FavoriteCreateDTO = z.infer<typeof FavoriteCreationSchema>;

export type FavoriteResponseDTO = {
  id: number,
  userId: string,
  postId: string
}

