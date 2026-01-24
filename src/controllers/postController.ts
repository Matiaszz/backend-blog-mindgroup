import { Request, Response } from "express";
import { createPost, deletePostById, getAllPosts, getMyPosts, getPost, getPostCoverImage, removeCoverImage, toogleLikePost, updatePostById, uploadImage } from "../services/postService";
import { LikeCreateDTO, LikeCreationSchema, PostCreateDTO, PostCreateSchema } from "../schemas/dtos";
import { AppError } from "../error/AppError";
import { Bytes } from "@prisma/client/runtime/library";

export async function createPostController(req: Request, res: Response) {
    const parsed = PostCreateSchema.safeParse(req.body);
    
    if (!parsed.success){
        return res.status(400).json({
            errors: parsed.error.flatten().fieldErrors,
        });
    }
    if (!req.user) throw new AppError('Usuário não autenticado', 401);

    const post = await createPost(req.body as PostCreateDTO,req.user.id);

    return res.status(201).json(post);
}

export async function uploadImageController(req: Request, res: Response, buffer: Buffer | undefined) {
    const {id} = req.params;
    if (!id) throw new AppError('Post not found.', 404);

    await uploadImage(id.toString(), buffer);
    return res.status(200).json({imageUpdated: true});
}

export async function getPostByIdController(req: Request, res: Response) {
    const {id} = req.params;
    if (!id) throw new AppError('Post not found.', 404);

    return res.json(await getPost(id.toString()));
}

export async function getPostCoverController(req: Request, res: Response) {
    const {id} = req.params;
    if (!id) throw new AppError('Post not found.', 404);

    const buffer = await getPostCoverImage(id.toString())
    return res.type("image/jpeg").send(buffer);
}


export async function getPosts(req: Request, res: Response) {
    return res.json(await getAllPosts());
}

export async function getMyPostsController(req: Request, res: Response) {
    return res.json(await getMyPosts(req.user?.id ?? ''));
}

export async function deletePostByIdController(req: Request, res: Response) {
    const {id} = req.params;
    return res.json(await deletePostById(req.user?.id ?? '', id.toString() ?? ''));
}

export async function updatePostByIdController(req: Request, res: Response) {
    const {postId} = req.params;
    return res.json(await updatePostById(req.user?.id ?? '', postId.toString(), req.body as PostCreateDTO))
}

export async function removeCover(req: Request, res: Response) {
    const {postId} = req.params;
    if (!postId) throw new AppError('Post not found.', 404);

    const buffer = await removeCoverImage(postId.toString(), req.user?.id ?? '');
    return res.type("image/jpeg").send(buffer);
}

export async function tooglePostLikeController(req: Request, res: Response) {
    const parsed = LikeCreationSchema.safeParse(req.body);
    
    if(!parsed.success) {
        return res.status(400).json(parsed.error.flatten().formErrors);
    }

    return res.json(await toogleLikePost(req.user?.id ?? '', req.body as LikeCreateDTO));    
}
