import {Router} from 'express';
import { UserRegisterDTO, UserRegisterSchema } from '../schemas/dtos';
import { loginController, logoutController, registerController } from '../controllers/authController';
import { getPostByIdController, getPostCoverController, getPosts as getPostsController } from '../controllers/postController';
import { getAllCategoriesController } from '../controllers/categoryController';

const router = Router();


router.post("/auth/register", async (req, res) => {
    await registerController(req, res);
});

router.post("/auth/login", async (req, res) => {
    await loginController(req, res);
});

router.post("/auth/logout", async (req, res) => {
    await logoutController(req, res);
});

router.get('/post/:id', async (req, res) => {
    await getPostByIdController(req, res);
});

router.get('/post/:id/cover', async (req, res) => {
    await getPostCoverController(req, res);
});

router.get('/posts', async (req, res) => {
    await getPostsController(req, res);
});

router.get('/categories', async (req, res) => {
    await getAllCategoriesController(req, res);
});


export default router;