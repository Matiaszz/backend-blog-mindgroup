import {Router} from 'express';
import { register } from '../services/authService';
import { UserRegisterDTO, UserRegisterSchema } from '../schemas/dtos';

const router = Router();


export default router;