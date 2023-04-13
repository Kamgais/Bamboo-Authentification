import { CategoryModel, ParticipationModel, ProjectModel, TaskModel } from "../models";



export class ProjectService {

    static async findById(id: number): Promise<ProjectModel| null> {
        try {
            const inDB = await ProjectModel.findByPk(id, {
                include: [
                    {model: TaskModel, as: 'tasks'},
                    {model: ParticipationModel, as: 'participations'},
                    {model: CategoryModel, as: 'categories'}
                ]
            });
            return Promise.resolve(inDB);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async findAll(): Promise<ProjectModel[]|null> {
        try {
            const projects = await ProjectModel.findAll({
                include: [
                    {model: TaskModel, as: 'tasks'},
                    {model: ParticipationModel, as: 'participations'},
                    {model: CategoryModel, as: 'categories'}
                ]
            })
            return Promise.resolve(projects);
        } catch (error) {
            return Promise.reject(error);
        }
    }


    static async save(project: ProjectModel): Promise<ProjectModel|null> {
        try {
            const saved = await ProjectModel.create(project);
            return Promise.resolve(saved);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}