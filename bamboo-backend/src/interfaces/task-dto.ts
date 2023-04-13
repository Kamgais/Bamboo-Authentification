

export interface TaskDto {
    id?: number;
    title?: string;
    description?: string;
    dueDate?: string;
    createdByUserId?: number;
    assignedToUserId?: number;
    priorityId?: number;
    projectId?: number;
    statusId?: number
}