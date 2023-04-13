import { ParticipationModel } from "../models";

export class ParticipationService {
    static async findById(id: number): Promise<any> {
        try {
            const fromDB = await ParticipationModel.findByPk(id);
            return Promise.resolve(fromDB);
        } catch (error) {
            return Promise.resolve(error);
        }
    }
}