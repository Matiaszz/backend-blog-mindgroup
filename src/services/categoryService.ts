import { PrismaClient } from "@prisma/client";
import { CategoryCreateDTO, CategoryResponseDTO } from "../schemas/dtos";

const db = new PrismaClient();

export async function createCategory(data: CategoryCreateDTO) {

    let category = await db.category.findMany({where: {label: data.label}});
    if (category.length === 0){
        return {isList: false, data: await db.category.create({data})};
    }

    return {isList: true, data: category};
}