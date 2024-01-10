import { NextFunction, Response } from "express";
import { IRequestWithUser } from "../interfaces";
import { middlewareMessages } from "../constant/message";
import { MiddlewareService } from "../services";

export class MiddlewareController {
    private middlewareService: MiddlewareService = new MiddlewareService()
    async verifyToken(req: IRequestWithUser, res: Response, next: NextFunction) {
        const token = req.headers['authorization'] as string
        const result = await this.middlewareService.verifyToken(token)
        if (result.isSuccess) {
            req.user = result.decoded
            next()
        } else {
            res.status(403).json(middlewareMessages.INVALID)
        }
    }

    async verifyAdmin(req: IRequestWithUser, res: Response, next: NextFunction) {
        const token = req.headers['authorization'] as string
        const result = await this.middlewareService.verifyAdmin(token)
        if (result.isSuccess) {
            req.user = result.user
            next()
        } else {
            res.status(403).json(middlewareMessages.INVALID)
        }
    }
}