import { ITask } from "../interfaces/task.interface";
import Task from "../models/task";

export const getAllTaskForUser = async (id: string): Promise<ITask[]> => {
    const tasks = await Task.find({ assignee: id }).populate('project')
    return tasks
}

export const getAllTaskForProject = async (id: string): Promise<ITask[]> => {
    const tasks = await Task.find({ project: id }).populate('assignee')
    return tasks
}

export const createTask = async (body: ITask): Promise<{ newTask: ITask, isSuccess: boolean }> => {
    const { name, type, project, priority, status, assignee, startDate, endDate } = body
    const newTask = await new Task({
        name, type, project, priority, status, assignee, startDate, endDate
    })
    await newTask.save()
    return { newTask, isSuccess: true }
}

export const updateTask = async (id: string, body: ITask): Promise<{ updateTask?: ITask, isSuccess: boolean }> => {
    const updateTask = await Task.findByIdAndUpdate(
        { _id: id },
        { $set: body },
        { new: true }
    )
    if (updateTask) {
        return { updateTask, isSuccess: true }
    }
}

export const deleteTask = async (id: string): Promise<{ isSuccess: boolean }> => {
    const deletedTask = await Task.findByIdAndDelete(id)
    if (deletedTask) {
        return { isSuccess: true }
    }
}

