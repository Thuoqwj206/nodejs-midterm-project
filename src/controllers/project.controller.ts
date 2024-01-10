import { projectMessages } from "../constant/message";
import { Request, Response } from 'express'
import { ProjectService } from "../services";
export class ProjectController {
    private projectService: ProjectService = new ProjectService()
    public getAllProject = async (req: Request, res: Response) => {
        try {
            const result = await this.projectService.getAllProject()
            if (result.isSuccess) { res.status(200).json(result.projectData) }
            else { res.status(500).json(projectMessages.NOT_FOUND) }
        } catch (error) {
            res.status(500).json(projectMessages.NOT_FOUND)
        }
    }

    public getProjectById = async (req: Request, res: Response) => {
        const result = await this.projectService.getProjectById(req.params.id as unknown as number)
        console.log(result)
        res.status(200).json(result)
    }

    public createProject = async (req: Request, res: Response) => {
        try {
            const result = await this.projectService.createProject(req.body)
            console.log(result)
            if (result.isSuccess) {
                res.status(200).json(result.newProject)
            }
        } catch (error) {
            res.status(500).json(projectMessages.CREATE_ERROR)
        }
    }

    public updateProject = async (req: Request, res: Response) => {
        try {
            const result = await this.projectService.updateProject(req.body, req.params.id as unknown as number)
            if (result.isSuccess) {
                res.status(200).json(result.updatedProject)
            }
            else { res.status(404).json(projectMessages.NOT_FOUND) }

        } catch (error) {
            res.status(500).json(projectMessages.NOT_FOUND)
        }
    }

    public deleteProject = async (req: Request, res: Response) => {
        try {
            const result = await this.projectService.deleteProject(req.params.id as unknown as number)
            if (result.isSuccess) {
                res.status(200).json(projectMessages.DELETE)
            }
            else { res.status(404).json(projectMessages.NOT_FOUND) }
        } catch (error) {
            res.status(500).json(projectMessages.NOT_FOUND)
        }
    }

    public addProjectMember = async (req: Request, res: Response) => {
        try {
            const result = await this.projectService.addProjectMember(req.body, req.params.id as unknown as number)
            if (result.isSuccess) {
                if (result.noActiveUsers.length > 0) {
                    res.status(200).json(
                        {
                            names: result.project.name,
                            members: result.project.members,
                            notActiveUsers: result.noActiveUsers
                        })
                }
                else {
                    res.status(200).json(result.project)
                }
            } else {
                res.status(404).json('Duplicate member or Not active')
            }
        } catch (error) {
            res.status(404).json(projectMessages.NOT_FOUND)
        }
    }

    public deleteMemberFromProject = async (req: Request, res: Response) => {
        try {
            const result = await this.projectService.deleteMemberFromProject(req.body, req.params.id as unknown as number)
            if (result.isSuccess) {
                res.status(200).json(result.project)
            }
            else {
                if (!result.isSuccess) {
                    res.status(404).json('Not found id or already deleted')
                }
                else { res.status(404).json(projectMessages.NOT_FOUND) }
            }
        } catch (error) {
            console.log(projectMessages.ERROR)
        }
    }

    public createProjectInvitation = async (req: Request, res: Response) => {
        try {
            const result = await this.projectService.createProjectInvitation(req.headers['authorization'] as string, req.params.id as unknown as number)
            if (result.isSuccess) {
                res.status(200).json({ invite_id: result.newInvitation })
            }
            else {
                res.status(404).json(projectMessages.NOT_FOUND)
            }
        } catch (error) {
            res.status(500).json(projectMessages.ERROR)
        }
    }

    public addMemberFromInviteId = async (req: Request, res: Response) => {
        try {
            const result = await this.projectService.addMemberFromInviteId(req.body, req.headers['authorization'] as string)
            if (result.isSuccess) {
                res.status(200).json({ names: result.project.name, members: result.project.members })
            }
            else {
                res.status(404).json(projectMessages.NO_ACTIVE)
            }
        } catch (error) {
            res.status(404).json(projectMessages.NO_ACTIVE)
        }
    }
}