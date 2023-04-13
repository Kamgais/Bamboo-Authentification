import { CategoryDto } from "./category-dto";
import { ParticipationDto } from "./participation-dto";
import { TaskDto } from "./task-dto";

export interface ProjectDto {
    id?: number;
    title?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
    authorId?: number;
    tasks?: TaskDto[];
    statusId?: number;
    particpations?: ParticipationDto[];
    categories?: CategoryDto[];
}