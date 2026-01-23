import { Request, Response } from "express";
import { CategoryCreateDTO, CategoryCreateSchema } from "../schemas/dtos";
import { createCategory, getAllCategories } from "../services/categoryService";


export async function createCategoryController(req: Request, res: Response) {
    const parsed = CategoryCreateSchema.safeParse(req.body);
    if (!parsed.success){
        return res.status(400).json({
            errors: parsed.error.flatten().fieldErrors
        });
    }

    const category = await createCategory(req.body as CategoryCreateDTO);
    return res.status(201).json(category);
}

export async function getAllCategoriesController(req: Request, res: Response) {
    return res.json(await getAllCategories());
}