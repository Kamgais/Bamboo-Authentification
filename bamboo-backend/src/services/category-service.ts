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

    static async findAll() {
        try {
            const categories = await CategoryModel.findAll();
            return Promise.resolve(categories)
        } catch (error) {
            return Promise.reject(error);
        }
    }
}