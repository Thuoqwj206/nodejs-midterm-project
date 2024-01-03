import { Router } from "express";
import middlewareController from "../services/middlewareService";
import projectController from "../services/projectService";

export const projectRouter = Router()

projectRouter.get('/get', middlewareController.verifyToken, projectController.getAllProject)
projectRouter.get('/get/:id', middlewareController.verifyToken, projectController.getProjectById)
projectRouter.post('/create', middlewareController.verifyToken, projectController.createProject)
projectRouter.put('/update/:id', middlewareController.verifyToken, projectController.updateProject)
projectRouter.delete('/delete/:id', middlewareController.verifyAdmin, projectController.deleteProject)
projectRouter.put('/add-member/:id', middlewareController.verifyAdmin, projectController.addProjectMember)
projectRouter.put('/delete-member/:id', middlewareController.verifyAdmin, projectController.deleteMemberFromProject)

