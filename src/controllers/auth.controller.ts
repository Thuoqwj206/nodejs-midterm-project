import { authMessages } from "../constant/message";
import { Request, Response } from 'express'
import { registerUSer, loginUser, logoutUser } from "../services";

export class AuthController {
    public async registerUser(req: Request, res: Response) {
        try {
            const result = await registerUSer(req.body)
            if (result) {
                res.status(200).json(result)
            }
            else {
                res.status(403).json(authMessages.INVALID_USERNAME)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public async loginUser(req: Request, res: Response) {
        try {
            const result = await loginUser(req.body)
            if (result.isSuccess) {
                res.status(200).json(result.data)
            }
            else if (result.isUsername) {
                res.status(404).json(authMessages.NOT_FOUND)
            }
            else if (result.isPassword) {
                res.status(404).json(authMessages.WRONG_PASSWORD)
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    public async logoutUser(req: Request, res: Response) {
        try {
            await logoutUser(req.headers['token'] as string)
            res.status(200).json('ook')

        } catch (error) {
            res.status(500).json(error)
        }
    }
}