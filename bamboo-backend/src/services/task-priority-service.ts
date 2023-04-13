import { TaskPriority } from "../models";

export class TaskPriorityService {

    static async findById(id: number) {
        try {
            const fromDB = await TaskPriority.findByPk(id);
            return Promise.resolve(fromDB);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}