import { projectMessages } from "../constant/message";
import { Request, Response } from 'express'
import { getAllProject, getProjectById, createProject, updateProject, deleteProject, addProjectMember, deleteMemberFromProject, createProjectInvitation, addMemberFromInviteId } from "../services";
export class ProjectController {

    public getAllProject = async (req: Request, res: Response) => {
        try {
            const result = await getAllProject()
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public getProjectById = async (req: Request, res: Response) => {
        try {
            const result = await getProjectById(req.params.id)
            console.log(result)
            if (result.isSuccess) {
                res.status(200).json(result.project)
            }
            else res.status(404).json(projectMessages.NOT_FOUND)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public createProject = async (req: Request, res: Response) => {
        try {
            const result = await createProject(req.body)
            console.log(result)
            if (result.isSuccess) {
                res.status(200).json(result.newProject)
            }
        } catch (error) {
            res.status(500).json(500)
        }
    }

    public updateProject = async (req: Request, res: Response) => {
        try {
            const result = await updateProject(req.body, req.params.id)
            if (result.isSuccess) {
                res.status(200).json(result.updateProject)
            }
            res.status(404).json(projectMessages.NOT_FOUND)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public deleteProject = async (req: Request, res: Response) => {
        try {
            const result = await deleteProject(req.params.id)
            if (result.isSuccess) {
                res.status(200).json(projectMessages.DELETE)
            }
            else { res.status(404).json(projectMessages.NOT_FOUND) }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public addProjectMember = async (req: Request, res: Response) => {
        try {
            const result = await addProjectMember(req.body, req.params.id)
            if (result.isSuccess) {
                res.status(200).json(result.updatedProject)
            } else {
                res.status(404).json(projectMessages.NOT_FOUND)
            }
        } catch (error) {
            console.log(error)
        }
    }

    public deleteMemberFromProject = async (req: Request, res: Response) => {
        try {
            const result = await deleteMemberFromProject(req.body, req.params.id)
            if (result.isSuccess) {
                res.status(200).json(result.updatedProject)
            }
            else {
                res.status(404).json(projectMessages.NOT_FOUND)
            }
        } catch (error) {
            console.log(error)
        }
    }

    public createProjectInvitation = async (req: Request, res: Response) => {
        try {
            const result = await createProjectInvitation(req.body)
            if (result.isSuccess) {
                res.status(200).json(result.newInvitation.invite_id)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public addMemberFromInviteId = async (req: Request, res: Response) => {
        try {
            const result = await addMemberFromInviteId(req.body)
            if (result.isSuccess) {
                res.status(200).json(result.project)
            }
            else {
                res.status(404).json('Not found any active invite')
            }
        } catch (error) {

        }
    }
}