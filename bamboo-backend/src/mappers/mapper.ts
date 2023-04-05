

export interface Mapper<Entity,Dto> {

    toDto(e: Entity): Dto;
    toEntity(dto:Dto): Entity;
}