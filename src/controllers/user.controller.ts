import e, { Request, Response } from 'express'
import { userMessages } from '../constant/message';
import { getAllUser, deleteUser } from '../services';

export class UserController {

    async getAllUser(req: Request, res: Response) {
        try {
            const result = await getAllUser()
            await res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const result = await deleteUser(req.params.id)
            if (result.isSuccess) {
                res.status(200).json(userMessages.DELETE)
            }
            else { res.status(404).json(userMessages.NOT_FOUND) }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}