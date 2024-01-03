import { authMessages } from "../constant/message";
import { AuthService } from "../services/auth.service";
import { Request, Response } from 'express'

export class AuthController {
    private authService: AuthService

    // constructor(authService: AuthService) {
    //     this.authService = authService;
    // }

    public async registerUser(req: Request, res: Response) {
        try {
            const result = await new AuthService().registerUSer(req.body)
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
            const result = await new AuthService().loginUser(req.body)
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

    async logoutUser() {
        return this.authService.logoutUser
    }
}