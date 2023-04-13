import { TaskStatus } from "../models";

export class TaskStatusService {
    static async findById(id: number) {
        try {
            const fromDB = await TaskStatus.findByPk(id);
            return Promise.resolve(fromDB);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}