import { Router } from "express";
import { MiddlewareController, ProjectController } from "../controllers";

export const projectRouter = Router()
const project = new ProjectController()
const middleware = new MiddlewareController()

projectRouter.get('/get', middleware.verifyAdmin, project.getAllProject)
projectRouter.get('/get/:id', middleware.verifyToken, project.getProjectById)
projectRouter.post('/create', middleware.verifyToken, project.createProject)
projectRouter.put('/update/:id', middleware.verifyToken, project.updateProject)
projectRouter.delete('/delete/:id', middleware.verifyAdmin, project.deleteProject)
projectRouter.put('/add-member/:id', middleware.verifyAdmin, project.addProjectMember)
projectRouter.put('/delete-member/:id', middleware.verifyAdmin, project.deleteMemberFromProject)
projectRouter.post('/create-invitation/:id', middleware.verifyToken, project.createProjectInvitation)
projectRouter.put('/handle-invitation/:id', middleware.verifyToken, project.addMemberFromInviteId)
