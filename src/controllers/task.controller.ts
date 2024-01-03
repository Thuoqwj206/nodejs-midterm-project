import Task from "../models/task";
import { Request, Response } from "express";
import { createTask, deleteTask, getAllTaskForProject, getAllTaskForUser, updateTask } from "../services";
export class TaskController {

    async getAllTaskForUser(req: Request, res: Response) {
        const result = await getAllTaskForUser(req.params.id)
        if (result) {
            res.status(200).json(result)
        }
    }

    async getAllTaskForProject(req: Request, res: Response) {
        const result = await getAllTaskForProject(req.params.id)
        if (result) {
            res.status(200).json(result)
        }
    }

    async createTask(req: Request, res: Response) {
        const result = await createTask(req.body)
        if (result.isSuccess) {
            res.status(200).json(result.newTask)
        }
        else {
            res.status(500)
        }
    }

    async updateTask(req: Request, res: Response) {
        const result = await updateTask(req.params.id, req.body)
        if (result.isSuccess) {
            res.status(200).json(result.updateTask)
        }
        else {
            res.status(500)
        }
    }

    async deleteTask(req: Request, res: Response) {
        const result = await deleteTask(req.params.id)
        if (result.isSuccess) {
            res.status(200)
        }
        else {
            res.status(500)
        }
    }
}   