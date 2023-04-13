import { ParticipationDto } from "../interfaces";
import { ParticipationModel } from "../models";
import { ParticipationService } from "../services";

export class ParticipationMapper {

    toDto(entity: ParticipationModel): ParticipationDto {
        return {
            id: entity.id,
            projectId: entity.projectId,
            userId: entity.userId,
            roleId: entity.roleId
        }
    }

    async toEntity(dto: ParticipationDto): Promise<ParticipationModel|null> {
        if(dto.id) {
            const entity = await ParticipationService.findById(dto.id);
            return entity;
        } else {
            const entity = {
                projectId: dto.projectId,
                userId: dto.userId,
                roleId: dto.roleId
            } as ParticipationModel

            return ParticipationModel.build(entity);
        }
    }
}