import { ProjectStatusDto } from "../interfaces";
import { ProjectStatus } from "../models";
import { ProjectStatusService } from "../services";

export class ProjectStatusMapper {
    toDto(entity: ProjectStatus): ProjectStatusDto {
        return {
            id: entity.id,
            statusName: entity.statusName,
            statusIcon : entity.statusIcon,
            projects: entity.projects.map(p => p.id)
        }
    }

    async toEntity(dto: ProjectStatusDto): Promise<ProjectStatus|null> {
        if(dto.id) {
            const entity = await ProjectStatusService.findById(dto.id);
            return entity;
        } else {
            const entity = {
                statusName: dto.statusName,
                statusIcon: dto.statusIcon
            } as ProjectStatus;
            return ProjectStatus.build(entity);
        }
    }
}