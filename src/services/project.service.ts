
import { IProject } from '../interfaces/project.interface'
import Project from '../models/project'


export class ProjectService {
    async getAllProject() {
        const projects = await Project.find()
        return projects
    }

    async getProjectById(id: string) {
        const project = await Project.findById(id)
        if (project) {
            return { project, isSuccess: true }
        }
        return { isSuccess: false }
    }

    async createProject(body: IProject) {
        const { name, slug, startDate, endDate } = body
        const newProject = await new Project({
            name, slug, startDate, endDate
        })
        await newProject.save()
        return { isSuccess: true, newProject }
    }

    async updateProject(body: IProject, id: string) {
        const updateProject = await Project.findOneAndUpdate(
            { _id: id },
            { $set: body },
            { new: true }
        )
        return { isSuccess: true, updateProject }
    }

    async deleteProject(id: string) {
        const project = await Project.findById(id)
        if (!project) {
            return { isSuccess: false }
        }
        await project.deleteOne()
        return { isSuccess: true }
    }

    async addProjectMember(body: IProject, id: string) {
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

    async deleteMemberFromProject(body: IProject, id: string) {
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

}
