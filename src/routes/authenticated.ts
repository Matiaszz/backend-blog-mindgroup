import {Router} from 'express';
import { UserRegisterDTO, UserRegisterSchema, UserResponseDTO } from '../schemas/dtos';
import { AppError } from '../error/AppError';
import { getUserController } from '../controllers/userController';

const router = Router();

router.get("/me",  async (req, res) => {
    await getUserController(req, res);
});


export default router;