import { TaskDto } from "../interfaces";
import { TaskModel } from "../models";
import { TaskService } from "../services";


export class TaskMapper {

    toDto(entity: TaskModel): TaskDto {
        return {
            id: entity.id,
            title: entity.title,
            description: entity.description,
            dueDate: entity.dueDate.toDateString(),
            createdByUserId: entity.createdByUserId,
            assignedToUserId: entity.assignedToUserId,
            projectId: entity.projectId,
            statusId: entity.statusId,
            priorityId: entity.priorityId
        }
    }

    async toEntity(dto: TaskDto): Promise<TaskModel|null> {
        if(dto.id) {
            const entity = await TaskService.findById(dto.id);
            return entity;
        } else {
            const entity = {
                title: dto.title,
                description: dto.description,
                dueDate: new Date(dto.dueDate!),
                createdByUserId: dto.createdByUserId,
                assignedToUserId: dto.assignedToUserId,
                priorityId: dto.priorityId,
                projectId: dto.projectId,
                statusId: dto.statusId
            } as TaskModel;
            return TaskModel.build(entity);
        }
    }
}