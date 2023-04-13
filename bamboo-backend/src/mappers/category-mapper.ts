import { CategoryDto } from "../interfaces";
import { CategoryModel } from "../models";
import { CategoryService } from "../services";

export class CategoryMapper {
    toDto(entity: CategoryModel): CategoryDto {
        return {
            id: entity.id,
            categoryName: entity.categoryName,
            categoryIcon: entity.categoryIcon,
            projects: entity.projects && entity.projects.map((p:any) => p.id)
        }
    }


    async toEntity(dto: CategoryDto): Promise<CategoryModel|null> {
        if(dto.id) {
            const entity = await CategoryService.findById(dto.id);
            return entity;
        } else {
            const entity = {
                categoryName: dto.categoryName,
                categoryIcon: dto.categoryIcon
            } as CategoryModel;

            return entity;
        }
    }
}