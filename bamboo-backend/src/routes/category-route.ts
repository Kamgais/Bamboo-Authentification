import { Router } from "express";
import { CategoryController } from "../controllers";

const router = Router();


// get all categories

router.get('/', CategoryController.getAllHandler);