import { Request, Response } from "express";
import { CreateUserInput, UserDto } from "../interfaces";
import { ApiResponseType, ErrorMessage } from "../utils/types";
import { UserService } from "../services";
import { UserMapper } from "../mappers";


export class AuthController {
   

    static async createAccountHandler(req: Request<{},{}, CreateUserInput>, res: Response<UserDto| ErrorMessage>): ApiResponseType<UserDto> {
       const {username, email} = req.body;
        // verify if user don't exist
        const existWithUsername = await UserService.findByUsername(username);
        if(existWithUsername) {
            return res.status(400).json({message: 'username already exists'})
        }
        const existWithEmail = await UserService.findByEmail(email);
        if(existWithEmail) {
            return res.status(400).json({message: 'account already created with this email'})
        }
      

        // store user to db
        const userInstance = UserMapper.prototype.toEntity(req.body);
        const stored = await userInstance.save();
        const dto = UserMapper.prototype.toDto(stored)
        return res.status(201).json(dto);
    }
}