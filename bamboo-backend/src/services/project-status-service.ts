import { ProjectStatus } from "../models";

export class ProjectStatusService {
    static async findById(id: number) {
        try {
            const fromDB = await ProjectStatus.findByPk(id);
            return Promise.resolve(fromDB);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}