import { RoleDto } from "../interfaces";
import { RoleModel } from "../models";
import { RoleService } from "../services";

export class RoleMapper {

    toDto(entity: RoleModel): RoleDto {

        return {
            id: entity.id,
            roleName: entity.roleName

        }
    }


    async toEntity(dto: RoleDto): Promise<RoleModel|null> {
        if(dto.id) {
            const entity = await RoleService.findById(dto.id);
            return entity;
        } else {
            const entity = {
                roleName: dto.roleName
            } as RoleModel;

            return RoleModel.build(entity);
        }
    }
}