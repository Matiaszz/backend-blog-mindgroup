import {Router} from 'express';
import { UserRegisterDTO, UserRegisterSchema } from '../schemas/dtos';
import { registerController } from '../controllers/authController';

const router = Router();


router.post("/auth/register", async (req, res) => {
    await registerController(req, res);
});

export default router;