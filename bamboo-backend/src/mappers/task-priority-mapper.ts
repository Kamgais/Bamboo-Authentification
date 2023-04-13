import { TaskPriorityDto } from "../interfaces";
import { TaskPriority } from "../models";
import { TaskPriorityService } from "../services";

export class TaskPriorityMapper {
    toDto(entity: TaskPriority): TaskPriorityDto {
        return {
            priorityName: entity.priorityName,
            priorityIcon: entity.priorityIcon,
            tasks: entity.tasks.map(t => t.id)
        }
    }


    async toEntity(dto: TaskPriorityDto) {
        if(dto.id) {
            const entity = await TaskPriorityService.findById(dto.id);
            return entity;
        } else {
            const entity = {
                priorityName: dto.priorityName,
                priorityIcon: dto.priorityIcon
            } as TaskPriority;

            return TaskPriority.build(entity);
        }
    }
}