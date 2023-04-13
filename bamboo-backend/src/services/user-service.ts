import { UserModel } from "../models";


export class UserService {


    static async save(user: UserModel) {
        try {
           const created = await  UserModel.create(user); 
           return Promise.resolve(created)
        } catch (error: any) {
            return Promise.reject(error)
        }
      
    }

    static async findByUsername(username: string) {
        try {
            const userInDB = await UserModel.findOne({
                where: {username}
            })
            return Promise.resolve(userInDB)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    static async findByEmail(email: string) {
        try {
            const userInDB = await UserModel.findOne({
                where: {email}
            })
            return Promise.resolve(userInDB)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    static async updateById(changes: Object, id: string) {
        try {
           await UserModel.update(changes, {where: {id}})
           const user = await UserModel.findByPk(id);
           return Promise.resolve(user); 
        } catch (error) {
            return Promise.reject(error)
        }
    }

    static async findById(id: number) {
        try {
            const user = await UserModel.findByPk(id);
            return Promise.resolve(user);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}