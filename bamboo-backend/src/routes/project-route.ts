import { Router } from "express";
import { ProjectController } from "../controllers";
import { validateRequest } from "../middlewares/validateRequest";
import { validateResource } from "../middlewares";
import { ProjectSchema } from "../schemas";

const router = Router();

// get all projects 
router.get('/', ProjectController.getAllProjects)

// post a project
router.post('/', validateResource(ProjectSchema), ProjectController.createProjectHandler)










export default router;