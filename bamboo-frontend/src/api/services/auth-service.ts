import instance from "../../config/axios-config"
import { UserDto } from "../interfaces"

type CreateUserInput = Omit<UserDto, "id">
type LoginUserInput = Omit<UserDto, "id"| "email">
type ApiErrorType = {
    message: string
}

type ForgotPasswordInput = {
    email: string;
}

type ResetPasswordInput = {
    password: string;
}

export const postUser = async(body: CreateUserInput): Promise<UserDto|ApiErrorType> => {
    try {
        const responseFromApi = await instance.post('/auth/create-account', body)
        const {data} = responseFromApi;
        return Promise.resolve(data);
    } catch (error: any) {
        return Promise.reject(error.response.data)
    }
}

export const loginUser = async(body: LoginUserInput): Promise<UserDto|ApiErrorType> => {
    try {
        const responseFromApi = await instance.post('/auth/login', body);
        const {data} = responseFromApi;
        return Promise.resolve(data)

    } catch (error:any) {
        return Promise.reject(error.response.data)
    }
}


export const sendResetPasswordLink =  async(body: ForgotPasswordInput): Promise<any> => {
    try {
        const responseFromApi = await instance.post('/auth/forgot-password', body);
        const {data} = responseFromApi;
        return Promise.resolve(data);
    } catch (error: any) {
        return Promise.reject(error.response.data);
    }
}

export const resetPassword = async(body: ResetPasswordInput, token: string) => {

    try {
        const responseFromApi = await instance.post(`/auth/reset-password/${token}`, body);
        return Promise.resolve()
    } catch (error: any) {
        return Promise.reject(error.response.data)
    }

}