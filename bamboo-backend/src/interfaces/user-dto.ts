import {z} from 'zod';
import { CreateUserSchema } from '../schemas';

export interface UserDto {
    id?:number,
    username?: string,
    password?: string,
    email?: string
}

export type CreateUserInput = z.infer<typeof CreateUserSchema>