import {Router} from 'express';
import { AppError } from '../error/AppError';
import { getUserController } from '../controllers/userController';
import { createPostController, getMyPostsController, uploadImageController } from '../controllers/postController';
import multer from 'multer';
import { multerConfig } from '../config/multer';

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

export default router;