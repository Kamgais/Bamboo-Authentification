import { TaskStatusDto } from "../interfaces";
import { TaskStatus } from "../models";
import { TaskStatusService } from "../services";

export class TaskStatusMapper {
    toDto(entity: TaskStatus): TaskStatusDto {
        return {
            id: entity.id,
            statusName: entity.statusName,
            statusIcon: entity.statusIcon,
            tasks: entity.tasks.map(t => t.id)
        }
    }

    async toEntity(dto: TaskStatusDto):Promise<TaskStatus|null> {
        if(dto.id) {
            const entity = await TaskStatusService.findById(dto.id);
            return entity;
        } else {
            const entity = {
                statusName: dto.statusName,
                statusIcon: dto.statusIcon
            } as TaskStatus;

            return TaskStatus.build(entity);
        }
    }
}