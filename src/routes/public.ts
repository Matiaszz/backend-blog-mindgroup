import {Router} from 'express';
import { UserRegisterDTO, UserRegisterSchema } from '../schemas/dtos';
import { loginController, logoutController, registerController } from '../controllers/authController';

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


export default router;