import { TaskModel } from "../models";


export class TaskService {
    static async findById(id: number): Promise<TaskModel|null> {
        try {
            const inDB = await TaskModel.findByPk(id);
            return Promise.resolve(inDB);
        } catch (error) {
            return Promise.reject(error)
        }
    }
}