import { Router } from "express";
import { MiddlewareController, TaskController } from "../controllers";
export const taskRouter = Router()
const task = new TaskController()
const middleware = new MiddlewareController()
//TASK
taskRouter.get('/get-user/:id', middleware.verifyToken, task.getAllTaskForUser)
taskRouter.get('/get-project/:id', middleware.verifyToken, task.getAllTaskForProject)
taskRouter.get('/get-project', middleware.verifyToken, task.getAllTasksByStatusAndPriority)
taskRouter.post('/create', middleware.verifyToken, task.createTask)
taskRouter.put('/update/:id', middleware.verifyToken, task.updateTask)
taskRouter.delete('/delete/:id', middleware.verifyToken, task.deleteTask)
//PRIORITY
taskRouter.get('/get-priority', middleware.verifyAdmin, task.listPriorityInOrder)
taskRouter.post('/create-priority', middleware.verifyAdmin, task.createPriority)
taskRouter.put('/update-priority/:id', middleware.verifyAdmin, task.updatePriority)
taskRouter.put('/hidden-priority/:id', middleware.verifyAdmin, task.hiddenPriority)
//STATUS
taskRouter.get('/get-status', middleware.verifyAdmin, task.listStatusInOrder)
taskRouter.post('/create-status', middleware.verifyAdmin, task.createStatus)
taskRouter.put('/update-status/:id', middleware.verifyAdmin, task.updateStatus)
taskRouter.put('/hidden-status/:id', middleware.verifyAdmin, task.hiddenStatus)
//TYPE
taskRouter.post('/create-type', middleware.verifyAdmin, task.createTaskType)
taskRouter.get('/get-type', middleware.verifyAdmin, task.listTaskType)
taskRouter.put('/update-type/:id', middleware.verifyAdmin, task.updateType)
taskRouter.put('/hidden-type/:id', middleware.verifyAdmin, task.hiddenType)