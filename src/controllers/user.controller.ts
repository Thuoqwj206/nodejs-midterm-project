import e, { Request, Response } from 'express'
import { userMessages } from '../constant/message';
import { Res } from 'string-strip-html';
import { UserService } from '../services';

export class UserController {
    private userService: UserService = new UserService()
    async getAllUser(req: Request, res: Response) {
        try {
            const result = await this.userService.getAllUsers()
            await res.status(200).json(result)
        } catch (error) {
            res.status(500).json(userMessages.NOT_FOUND)
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const result = await this.userService.deleteUser(req.params.id as unknown as number)
            if (result.isSuccess) {
                res.status(200).json(userMessages.DELETE)
            }
            else { res.status(404).json(userMessages.NOT_FOUND) }
        } catch (error) {
            res.status(500).json(userMessages.NOT_FOUND)
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const result = await this.userService.getUserById(req.params.id as unknown as number)
            if (result.isSuccess) {
                res.status(200).json({ id: result.id, userInfo: result.userInfo, userProjects: result.userProjects, userTasks: result.userTasks })
            }
            else {
                res.status(404).json(userMessages.NOT_FOUND)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async getUserProjects(req: Request, res: Response) {
        try {
            const result = await this.userService.getUserProjects(req.headers['authorization'] as string)
            if (result) {
                res.status(200).json(result)
            }
            else {
                res.status(404).json(userMessages.NOT_FOUND)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error)

        }
    }

    async getUserTask(req: Request, res: Response) {
        const result = await this.userService.getUserTask(req.headers['authorization'] as string)
        res.status(200).json(result)
    }

    async updateUser(req: Request, res: Response) {
        try {
            const result = await this.userService.updateUser(req.params.id as unknown as number, req.body)
            if (result.isSuccess) {
                res.status(200).json(result)
            }
            else {
                res.status(404).json(userMessages.NOT_FOUND)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

}