import { Router } from "express";
import { MiddlewareController, TaskController } from "../controllers";
export const taskRouter = Router()
const task = new TaskController()
const middleware = new MiddlewareController()

taskRouter.get('/get-user/:id', middleware.verifyToken, task.getAllTaskForUser)
taskRouter.get('/get-project/:id', middleware.verifyToken, task.getAllTaskForProject)
taskRouter.post('/create', middleware.verifyToken, task.createTask)
taskRouter.put('/update/:id', middleware.verifyToken, task.updateTask)
taskRouter.delete('/delete/:id', middleware.verifyToken, task.deleteTask)
