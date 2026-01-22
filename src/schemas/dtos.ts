import { z } from "zod";
import { AccountType, Post } from "@prisma/client";

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
  coverImage: z.url(),
  tags: z.string(),
  categoryId: z.number(),
});

export type PostCreateDTO = z.infer<typeof PostCreateSchema>;

export type PostResponseDTO = {
  id: string;
  title: string;
  summary: string;
  content: string;
  coverImage: string;
  tags: string;
  published: boolean;
  views: number;
  averageReadTimeInMinutes: number;
  createdAt: Date;
  author: UserResponseDTO
  category: CategoryResponseDTO
};

export const CommentCreateSchema = z.object({
  postId: z.uuid(),
  content: z.string().min(1),
});

export type CommentCreateDTO = z.infer<typeof CommentCreateSchema>;
export type LogResponseDTO = {
  id: number;
  action: string;
  createdAt: Date;
  userId: string;
  postId: string;
};
