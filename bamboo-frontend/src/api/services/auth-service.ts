import instance from "../../config/axios-config"
import { UserDto } from "../interfaces"

type CreateUserInput = Omit<UserDto, "id">
type LoginUserInput = Omit<UserDto, "id"| "email">
type ApiErrorType = {
    message: string
}

export const postUser = async(body: CreateUserInput): Promise<UserDto|ApiErrorType> => {
    try {
        const responseFromApi = await instance.post('/auth/create-account', body)
        const {data} = responseFromApi;
        return Promise.resolve(data);
    } catch (error: any) {
        return Promise.reject({message: error.response.data})
    }
}

export const loginUser = async(body: LoginUserInput): Promise<UserDto|ApiErrorType> => {
    try {
        const responseFromApi = await instance.post('/auth/login', body);
        const {data} = responseFromApi;
        return Promise.resolve(data)

    } catch (error:any) {
        return Promise.reject({})
    }
}