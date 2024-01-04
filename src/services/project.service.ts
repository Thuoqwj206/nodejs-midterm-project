
import { IProject } from '../interfaces/project.interface'
import Project from '../models/project'


export const getAllProject = async () => {
    const projects = await Project.find()
    return projects
}

export const getProjectById = async (id: string) => {
    const project = await Project.findById(id)
    if (project) {
        return { project, isSuccess: true }
    }
    return { isSuccess: false }
}

export const createProject = async (body: IProject) => {
    const { name, slug, startDate, endDate } = body
    const newProject = await new Project({
        name, slug, startDate, endDate
    })
    await newProject.save()
    return { isSuccess: true, newProject }
}

export const updateProject = async (body: IProject, id: string) => {
    const updateProject = await Project.findOneAndUpdate(
        { _id: id },
        { $set: body },
        { new: true }
    )
    return { isSuccess: true, updateProject }
}

export const deleteProject = async (id: string) => {
    const project = await Project.findById(id)
    if (!project) {
        return { isSuccess: false }
    }
    await project.deleteOne()
    return { isSuccess: true }
}

export const addProjectMember = async (body: IProject, id: string) => {
    const { members } = body
    const updatedProject = await Project.findOneAndUpdate(
        { _id: id },
        { $pushAll: { members: members } },
        { new: true }
    );
    if (!updatedProject) {
        return { isSuccess: false }
    }
    return { updatedProject, isSuccess: true }
}

export const deleteMemberFromProject = async (body: IProject, id: string) => {
    const { members } = body
    console.log(members)
    const updatedProject = await Project.findOneAndUpdate(
        { _id: id },
        { $pullAll: { members: members } },
        { new: true }
    );
    if (!updatedProject) {
        return { isSuccess: false }
    }
    return { isSuccess: true, updatedProject }
}