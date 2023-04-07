import { UserDto } from "../interfaces";
import { UserModel } from "../models";
import { Mapper } from "./mapper";


export class UserMapper implements Mapper<UserModel, UserDto> {
    
    
    toDto(e: UserModel): UserDto {
        return {
            id: e.id,
            username: e.username,
            email: e.email,
            isAccountConfirmed: e.isAccountConfirmed
        }
    }
    toEntity(dto: UserDto): UserModel {
       return UserModel.build(
        {
           ...dto

        } as UserModel
       )
    }
  
 
    
}