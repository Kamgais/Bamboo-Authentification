import { z } from "zod";

export const CreateUserSchema = z.object({
    username: z.string({required_error: "Username is required", invalid_type_error: "Username must be a string"}).min(3).max(20),
    email: z.string({required_error: 'Email is required', invalid_type_error: 'Email must be a string'}).email({message: 'Invalid email address'}),
    password: z.string({required_error: 'Password is required', invalid_type_error: ' Password must be a string'}).min(3).max(20)
})

export const LoginUserSchema = z.object({
    username: z.string({required_error: 'Username is required', invalid_type_error: 'Username must be a string'}).min(3).max(20),
    password: z.string({required_error: 'Password is required', invalid_type_error: 'Password must be a string'}).min(3).max(20)
})

