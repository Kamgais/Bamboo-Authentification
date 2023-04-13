import {z} from 'zod';
import { CreateUserSchema, ForgotPasswordSchema, LoginUserSchema, ResetPasswordSchema } from '../schemas';

export interface UserDto {
    id?:number,
    username?: string,
    password?: string,
    email?: string,
    isAccountConfirmed?: boolean,
    googleId?: number,
    githubId?: number,
    profilePic?: string;
    createdTasks?: number[];
    assignedTasks?: number[];
    projects?: number[]
}

export type CreateUserInput = z.infer<typeof CreateUserSchema>
export type LoginUserInput = z.infer<typeof LoginUserSchema>
export type ForgotPasswordInput = z.infer< typeof ForgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>