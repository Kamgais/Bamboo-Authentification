import { Response } from "express";


export type ErrorMessage = {
    message: string
}

export type ApiResponseType<T> = T | ErrorMessage 