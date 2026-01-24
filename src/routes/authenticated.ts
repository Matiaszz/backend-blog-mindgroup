import {Router} from 'express';
import { AppError } from '../error/AppError';
import { getUserController, updateUserController } from '../controllers/userController';
import { createPostController, deletePostByIdController, getMyPostsController, removeCover, togglePostFavoriteController, tooglePostLikeController as togglePostLikeController, updatePostByIdController, uploadImageController } from '../controllers/postController';
import multer from 'multer';
import { multerConfig } from '../config/multer';
import { createCommentController, toggleCommentLikeController } from '../controllers/commentController';

const router = Router();
const upload = multer(multerConfig);

router.get("/me",  async (req, res) => {
    await getUserController(req, res);
});

router.post('/post', async (req, res) => {
    await createPostController(req, res);
});

router.post('/post/:id/upload', upload.single("file"), async (req, res) => {
    
    if (!req.file?.originalname.toLowerCase().match(/\.(png|jpg|jpeg)$/)) {
        throw new AppError('Extensão inválida, deve ser JPG, JPEG ou PNG', 400);
    }
    
    const coverImage = req.file?.buffer;
    await uploadImageController(req, res, coverImage);
});

router.get('/posts/my', async (req, res) => {
    await getMyPostsController(req, res);
});

router.delete('/post/:id', async (req, res) => {
    await deletePostByIdController(req, res);
});

router.put('/post/:postId', async (req, res) => {
    await updatePostByIdController(req, res);
});

router.delete('/post/:postId/removeCover', async (req, res) => {
    await removeCover(req, res);
});

router.post('/comment', async (req, res) => {
    await createCommentController(req, res);
});

router.put('/toggleLike', async (req, res) => {
    await togglePostLikeController(req, res);
});

router.put('/toggleFavorite', async (req, res) => {
    await togglePostFavoriteController(req, res);
});

router.put('/toggleCommentLike', async (req, res) => {
    await toggleCommentLikeController(req, res);
});

router.put('/user', async (req, res) => {
    await updateUserController(req, res);
});

export default router;