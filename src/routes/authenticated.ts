import {Router} from 'express';
import { register } from '../services/authService';
import { UserRegisterDTO, UserRegisterSchema } from '../schemas/dtos';

const router = Router();

router.get("/get", async (req, res) => {
    return res.status(200).json({t: req.user});
})

export default router;