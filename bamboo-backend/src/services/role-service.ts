import { RoleModel } from "../models";

export class RoleService {
    static async findById(id: number): Promise<RoleModel|null> {
        try {
            const fromDB = await RoleModel.findByPk(id);
            return Promise.resolve(fromDB);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}