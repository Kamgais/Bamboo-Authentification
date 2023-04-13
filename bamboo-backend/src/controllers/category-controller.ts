import { Request, Response } from "express";
import { CategoryService } from "../services";
import { CategoryMapper } from "../mappers/category-mapper";



export class CategoryController {

    static async getAllHandler(req: Request, res: Response): Promise<Response> {

        try {
            const categories = await  CategoryService.findAll();
            const dtos = categories.map((c:any) => CategoryMapper.prototype.toDto(c));
            return res.status(200).json(dtos);
        } catch (error) {
            return res.status(500).json(error);
        }

    }
}