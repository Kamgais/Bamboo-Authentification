import instance from "../../config/axios-config";
import { ProjectDto } from "../interfaces";



   export async function fetchAll(): Promise<ProjectDto[]|null> {
        try {
            const responseFromApi = await instance.get('/projects');
            const {data} = responseFromApi;
            return Promise.resolve(data);
        } catch (error: any) {
            return Promise.reject(error)
        }
    }
