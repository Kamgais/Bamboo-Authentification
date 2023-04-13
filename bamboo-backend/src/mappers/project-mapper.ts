import { ProjectDto } from "../interfaces";
import { CategoryModel, ProjectModel } from "../models";
import { ProjectService } from "../services";
import { CategoryMapper } from "./category-mapper";
import { ParticipationMapper } from "./participation-mapper";
import { TaskMapper } from "./task-mapper";


export class ProjectMapper {

    toDto(entity: ProjectModel): ProjectDto {
       
        return {
            id: entity.id,
            title: entity.title,
            description: entity.description,
            startDate: entity.startDate.toDateString(),
            endDate: entity.endDate.toDateString(),
            authorId: entity.authorId,
            statusId: entity.statusId,
             tasks: entity.tasks && entity.tasks.map((t:any) => TaskMapper.prototype.toDto(t)),
             particpations: entity.participations && entity.participations.map((p:any) => ParticipationMapper.prototype.toDto(p)),
             categories: entity.categories && entity.categories.map((c:any) => CategoryMapper.prototype.toDto(c))


        }
    }

    async toEntity(dto: ProjectDto): Promise<ProjectModel| null> {
        if(dto.id) {
            const entity = await ProjectService.findById(dto.id);
            return entity;
        } else {
            const entity = {
                title: dto.title,
                description: dto.description,
                startDate: new Date(dto.startDate!),
                endDate: new Date(dto.endDate!),
                authorId: dto.authorId,
                statusId: dto.statusId,
            } as ProjectModel;

            const project = await ProjectModel.create(entity)
            await (project as any).setCategories(dto.categories!.map((c: any) => c.id));
        
         
            
            return project;

        }

        
    }
}