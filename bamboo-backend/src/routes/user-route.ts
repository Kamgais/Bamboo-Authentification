import { Router } from "express";
import { UserController } from "../controllers";

const router = Router();


// fetch user by id
router.get('/:id', UserController.getUserById)


export default router;