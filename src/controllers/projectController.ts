import Project from '../models/project'
import { Response, Request } from 'express'


const projectController = {
    getAllProject: async (req: Request, res: Response) => {
        try {
            const project = await Project.find()
            return res.status(200).json(project)
        } catch (error) {
            res.status(500).json(error).end()
        }
    },

    getProjectById: async (req: Request, res: Response) => {
        try {
            const project = await Project.findById(req.params.id)
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
            const project = await Project.findById(req.params.id)
            if (!project) {
                res.status(404).json('Not found Project')
            }
            project.name = body.name
            await project.save()
            return res.status(200).json(project).end()
        } catch (error) {
            res.status(500).json(error)
        }
    },

    deleteProject: async (req: Request, res: Response) => {
        try {
            const project = await Project.findById(req.params.id)
            if (!project) {
                res.status(404).json('Not found Project')
            }
            await project.deleteOne()
            res.status(200).json('Deleted Successfully')
        } catch (error) {
            res.status(500).json(error)
        }
    },

    addProjectMember: async (req: Request, res: Response) => {
        try {
            const { body } = req
            const project = await Project.findById(req.params.id)
            if (!project) {
                res.status(404).json('Not found Project')
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
            const project = await Project.findById(req.params.id);
            if (!project) {
                res.status(404).json('Not found Project')
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

export default projectController;