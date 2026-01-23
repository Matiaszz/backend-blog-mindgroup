import {Router} from 'express';
import { createCategoryController } from '../controllers/categoryController';

const router = Router();

router.post('/category', async (req, res) => {
    await createCategoryController(req, res);
});


export default router;