import { UserDto } from "../interfaces";
import { UserModel } from "../models";
import { ProjectService, TaskService, UserService } from "../services";



export class UserMapper  {
    
    
    toDto(e: UserModel): UserDto {
        return {
            id: e.id,
            username: e.username,
            email: e.email,
            isAccountConfirmed: e.isAccountConfirmed,
            googleId: e.googleId,
            githubId: e.githubId,
            projects: e.projects && e.projects.map((p)=> p.id),
            createdTasks: e.createdTasks && e.createdTasks.map((t) => t.id),
            assignedTasks: e.assignedTasks &&  e.assignedTasks.map((t)=>t.id),
            profilePic: e.profilePic
        }
    }
    
    
   async toEntity(dto: UserDto): Promise<UserModel|null> {
        if(dto.id) {
            const entity = await UserService.findById(dto.id);
            return entity;
        }
        const toSave = {
            username : dto.username,
            email: dto.email,
            password: dto.password,
            isAccountConfirmed: dto.isAccountConfirmed,
            googleId: dto.googleId,
            githubId: dto.githubId,
            // projects: dto.projects && await Promise.all(
            //    dto.projects.map( async(id) =>  await ProjectService.findById(id) )
            // ),
            // createdTasks: dto.createdTasks && await Promise.all(
            //     dto.createdTasks.map(async (id) => await TaskService.findById(id))
            // ) ,
            // assignedTasks: dto.assignedTasks && await Promise.all(
            //     dto.assignedTasks!.map(async (id) => await TaskService.findById(id))
            // ) ,
            profilePic: dto.profilePic
            } as UserModel
            return UserModel.build(
                toSave
            )
       
    }
  
 
    
}