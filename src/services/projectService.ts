import { projectMessages } from '../constant/message'
import { IProjectInterface } from '../interfaces/projectInterface'
import Project from '../models/project'
import { Response, Request } from 'express'


const projectService = {
    getAllProject: async (req: Request, res: Response) => {
        try {
            const projects = await Project.find()
            return res.status(200).json(projects)
        } catch (error) {
            res.status(500).json(error).end()
        }
    },

    getProjectById: async (req: Request, res: Response) => {
        try {
            const { body } = req
            const project: IProjectInterface | null = await Project.findById(body.id)
            if (!project) {
                res.status(404).json(projectMessages[404])
            }
            return res.status(200).json(project)
        } catch (error) {
            res.status(500).json(error).end()
        }
    },

    createProject: async (req: Request, res: Response) => {
        try {
            console.log(req.body)
            const newProject = await new Project({
                name: req.body.name,
                slug: req.body.slug,
                startDate: req.body.startDate,
                endDate: req.body.endDate
            })
            const project = await newProject.save()
            res.status(200).json(project)
        } catch (error) {
            console.log(error)
        }
    },

    updateProject: async (req: Request, res: Response) => {
        try {
            const { body } = req
            const project: IProjectInterface | null = await Project.findById(body.id)
            if (!project) {
                res.status(404).json(projectMessages[404])
            }
            project.name = body.name
            project.slug = body.slug
            project.startDate = body.startDate
            project.endDate = body.endDate
            await project.save()
            return res.status(200).json(project).end()
        } catch (error) {
            res.status(500).json(error)
        }
    },

    deleteProject: async (req: Request, res: Response) => {
        try {
            const { body } = req
            const project = await Project.findById(body.id)
            if (!project) {
                res.status(404).json(projectMessages[404])
            }
            await project.deleteOne()
            res.status(200).json(projectMessages.DELETE)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    addProjectMember: async (req: Request, res: Response) => {
        try {
            const { body } = req
            const project = await Project.findById(body.id)
            if (!project) {
                res.status(404).json(projectMessages[404])
            }
            project.members = body.members
            await project.save()
            res.status(200).json(project)
        } catch (error) {
            console.log(error)
        }
    },

    deleteMemberFromProject: async (req: Request, res: Response) => {
        try {
            const { body } = req;
            const project = await Project.findById(body.id);
            if (!project) {
                res.status(404).json(projectMessages[404])
            }
            const deleteMembers = body.members;
            await deleteMembers.map((member) => {
                if (project.members.includes(member)) {
                    project.members.splice(project.members.indexOf(member), 1);
                }
            });
            await project.save()
            res.status(200).json(project)
        } catch (error) {
            res.status(500).json(error)
        }
    }



}

export default projectService;