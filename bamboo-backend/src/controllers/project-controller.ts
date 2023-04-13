import { Request, Response } from "express";
import { ProjectDto } from "../interfaces";
import { ProjectService } from "../services";
import { ProjectMapper } from "../mappers";
import { ApiResponseType } from "../utils/types";
import { ProjectModel } from "../models";


export class ProjectController {

    static async getAllProjects(req:Request, res: Response<ApiResponseType<ProjectDto[]>>): Promise<Response> {
        try {
            const allProjects = await ProjectService.findAll();
            const dtos = allProjects?.map((p: any) => ProjectMapper.prototype.toDto(p));
            return res.status(200).json(dtos);
        } catch (error: any) {
            return res.status(500).json({message: error.message})
        }
    }


    static async createProjectHandler(req: Request<{},{}, ProjectDto>, res: Response<ApiResponseType<ProjectDto>>): Promise<Response> {
        try {
          //  console.log(req.body)
            const entity = await ProjectMapper.prototype.toEntity(req.body);
          
            const saved = await ProjectService.findById(entity!.id);

            const dto = ProjectMapper.prototype.toDto(saved!)
            return res.status(201).json(dto);
        } catch (error: any) {
            return res.status(500).json({message: error.message})
        }
    }
}