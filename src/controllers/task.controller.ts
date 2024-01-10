
import { Request, Response } from "express";
import { taskMessages } from "../constant/message";
import { TaskService } from "../services";

export class TaskController {

    private taskService: TaskService = new TaskService()
    async getAllTaskForUser(req: Request, res: Response) {
        console.log(req.body)
        const result = await this.taskService.getAllTaskForUser(req.params.id as unknown as number)
        if (result) {
            res.status(200).json(result)
        }
        else {
            res.status(500).json(taskMessages.NOT_FOUND)
        }
    }

    async getAllTasksByStatusAndPriority(req: Request, res: Response) {
        const result = await this.taskService.getAllTasksByStatusAndPriority()
        res.status(200).json(result)
    }

    async getAllTaskForProject(req: Request, res: Response) {
        const result = await this.taskService.getAllTaskForProject(req.params.id as unknown as number)
        if (result) {
            res.status(200).json(result)
        }
        else {
            res.status(500).json(taskMessages.NOT_FOUND)
        }
    }

    async createTask(req: Request, res: Response) {
        try {
            const result = await this.taskService.createTask(req.body)
            if (!result.isSuccess) {
                if (result.outDated) {
                    res.status(404).json('Task dates must be within the project dates.')
                }
                else if (!result.isActive) {
                    res.status(404).json('The assignee is not active user')
                }
                else { res.status(200).json(taskMessages.CREATE_ERROR) }
            }
            else {
                res.status(200).json(result.newTask)
            }
        } catch (error) {
            res.status(500).json(taskMessages.CREATE_ERROR)
        }
    }

    async updateTask(req: Request, res: Response) {
        try {
            const result = await this.taskService.updateTask(req.params.id as unknown as number, req.body)
            if (!result.isSuccess) {
                if (result.outDated) {
                    res.status(404).json('Task dates must be within the project dates.')
                }
                else if (!result.isActive) {
                    res.status(404).json('The assignee is not active user')
                }
                else { res.status(200).json(taskMessages.CREATE_ERROR) }
            }
            else {
                res.status(200).json(result.updateTask)
            }
        } catch (error) {
            res.status(500).json(taskMessages.CREATE_ERROR)
        }
    }

    async deleteTask(req: Request, res: Response) {
        const result = await this.taskService.deleteTask(req.params.id)
        if (result.isSuccess) {
            res.status(200).json('deleted')
        }
        else {
            res.status(500).json(taskMessages.NOT_FOUND)
        }
    }



    async listStatusInOrder(req: Request, res: Response) {
        const result = await this.taskService.listStatusInOrder()
        if (result.isSuccess) {
            res.status(200).json(result.statusOrder)
        }
        else {
            res.status(500).json(taskMessages.NO_DATA)
        }
    }

    async createStatus(req: Request, res: Response) {
        const result = await this.taskService.createStatus(req.body)
        if (result.isSuccess) {
            res.status(200).json(result.newStatus)
        }
        else {
            res.status(500).json(taskMessages.NOT_FOUND)
        }
    }

    async updateStatus(req: Request, res: Response) {
        const result = await this.taskService.updateStatus(req.params.id as unknown as number, req.body)
        if (result.isSuccess) {
            res.status(200).json(result.updateStatus)
        }
        else {
            res.status(500).json(taskMessages.NOT_FOUND)
        }
    }

    async hiddenStatus(req: Request, res: Response) {
        const result = await this.taskService.hiddenStatus(req.params.id as unknown as number)
        if (result.isSuccess) {
            res.status(200).json(result.hiddenStatus)
        }
        else {
            res.status(500).json(taskMessages.NOT_FOUND)
        }
    }

    async listPriorityInOrder(req: Request, res: Response) {
        const result = await this.taskService.listPriorityInOrder()
        if (result.isSuccess) {
            res.status(200).json(result.priorityOrder)
        }
        else {
            res.status(500).json(taskMessages.NOT_FOUND)
        }
    }


    async createPriority(req: Request, res: Response) {
        console.log(req.body)
        const result = await this.taskService.createPriority(req.body)
        if (result.isSuccess) {
            res.status(200).json(result.newPriority)
        }
        else {
            res.status(500).json(taskMessages.NOT_FOUND)
        }
    }

    async updatePriority(req: Request, res: Response) {
        const result = await this.taskService.updatePriority(req.params.id as unknown as number, req.body)
        if (result.isSuccess) {
            res.status(200).json(result.updatePriority)
        }
        else {
            res.status(500).json(taskMessages.NOT_FOUND)
        }
    }

    async hiddenPriority(req: Request, res: Response) {
        const result = await this.taskService.hiddenPriority(req.params.id as unknown as number)
        if (result.isSuccess) {
            res.status(200).json(result.hiddenPriority)
        }
        else {
            res.status(500).json(taskMessages.NOT_FOUND)
        }
    }

    async createTaskType(req: Request, res: Response) {
        const result = await this.taskService.createTaskType(req.body)
        if (result.isSuccess) {
            res.status(200).json(result.newType)
        }
        else {
            res.status(500).json(taskMessages.NOT_FOUND)
        }
    }

    async listTaskType(req: Request, res: Response) {
        const result = await this.taskService.listTaskType()
        if (result.isSuccess) {
            res.status(200).json(result.types)
        }
        else {
            res.status(500).json(taskMessages.NOT_FOUND)
        }
    }

    async updateType(req: Request, res: Response) {
        const result = await this.taskService.updateType(req.params.id as unknown as number, req.body)
        if (result.isSuccess) {
            res.status(200).json(result.updateType)
        }
        else {
            res.status(500).json(taskMessages.NOT_FOUND)
        }
    }

    async hiddenType(req: Request, res: Response) {
        const result = await this.taskService.hiddenType(req.params.id as unknown as number)
        if (result.isSuccess) {
            res.status(200).json(result.hiddenType)
        }
        else {
            res.status(500).json(taskMessages.NOT_FOUND)
        }
    }
}   