import { authMessages } from "../constant/message";
import { Request, Response } from 'express'
import { AuthService } from "../services";

export class AuthController {
    private authService: AuthService = new AuthService()
    public async registerUser(req: Request, res: Response) {
        try {
            const result = await this.authService.registerUser(req.body)
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
            const result = await this.authService.loginUser(req.body)
            if (result.isSuccess) {
                const { user, token } = result.data
                const { username, email, isActive } = user
                res.status(200).json({ username, email, isActive, token })
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
            await this.authService.logoutUser(req.headers['authorization'] as string)
            res.status(200).json(authMessages.LOG_OUT)

        } catch (error) {
            res.status(500).json(error)
        }
    }
}