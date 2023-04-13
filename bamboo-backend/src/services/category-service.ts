import { CategoryModel } from "../models";

export class CategoryService {
    static async findById(id: number) {
        try {
          const fromDB = await CategoryModel.findByPk(id);
          return Promise.resolve(fromDB);  
        } catch (error) {
            return Promise.reject(error)
        }
    }
}