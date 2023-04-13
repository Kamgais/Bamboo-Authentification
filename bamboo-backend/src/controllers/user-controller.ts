import { Request, Response } from "express";
import { UserService } from "../services";
import { ApiResponseType } from "../utils/types";
import { UserDto } from "../interfaces";
import { UserMapper } from "../mappers";


export class UserController {

    static async getUserById(req: Request, res: Response<ApiResponseType<UserDto>>): Promise<Response> {
        const id = req.params.id;
        try {
            const user = await UserService.findById(+id);
            const dto = UserMapper.prototype.toDto(user!)
            return res.status(200).json(dto);
        } catch (error: any) {
            return res.status(500).json({message: error.message})
        }
    }
}
