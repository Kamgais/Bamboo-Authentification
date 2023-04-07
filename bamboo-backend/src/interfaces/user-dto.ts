import {z} from 'zod';
import { CreateUserSchema, ForgotPasswordSchema, LoginUserSchema } from '../schemas';

export interface UserDto {
    id?:number,
    username?: string,
    password?: string,
    email?: string,
    isAccountConfirmed?: boolean
}

export type CreateUserInput = z.infer<typeof CreateUserSchema>
export type LoginUserInput = z.infer<typeof LoginUserSchema>
export type ForgotPasswordInput = z.infer< typeof ForgotPasswordSchema>