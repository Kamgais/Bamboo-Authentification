"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordSchema = exports.ForgotPasswordSchema = exports.LoginUserSchema = exports.CreateUserSchema = void 0;
const zod_1 = require("zod");
exports.CreateUserSchema = zod_1.z.object({
    username: zod_1.z.string({ required_error: "Username is required", invalid_type_error: "Username must be a string" }).min(3).max(20),
    email: zod_1.z.string({ required_error: 'Email is required', invalid_type_error: 'Email must be a string' }).email({ message: 'Invalid email address' }),
    password: zod_1.z.string({ required_error: 'Password is required', invalid_type_error: ' Password must be a string' }).min(3).max(20)
});
exports.LoginUserSchema = zod_1.z.object({
    username: zod_1.z.string({ required_error: 'Username is required', invalid_type_error: 'Username must be a string' }).min(3).max(20),
    password: zod_1.z.string({ required_error: 'Password is required', invalid_type_error: 'Password must be a string' }).min(3).max(20)
});
exports.ForgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string({ required_error: 'Email is required', invalid_type_error: 'Email must be a string' }).email({ message: 'Invalid email format' })
});
exports.ResetPasswordSchema = zod_1.z.object({
    password: zod_1.z.string({ required_error: 'password is required', invalid_type_error: 'password must be a string' }).min(3).max(20)
});
