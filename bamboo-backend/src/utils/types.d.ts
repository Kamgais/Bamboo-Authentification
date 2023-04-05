import { Response } from "express";


export type ErrorMessage = {
    message: string
}

export type ApiResponseType<T> = Promise<Response<T> | ErrorMessage> 