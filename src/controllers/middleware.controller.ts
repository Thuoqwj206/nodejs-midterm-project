import { NextFunction } from "express";
import { IRequestWithUser } from "../interfaces";
import { middlewareMessages } from "../constant/message";
import { Response } from 'express'
import { MiddlewareService } from "../services";

export class MiddlewareController {
    // private middlewareService: MiddlewareService
    // constructor() {
    //     this.middlewareService = new MiddlewareService()
    // }

    async verifyToken(req: IRequestWithUser, res: Response, next: NextFunction) {
        const token = req.headers['token'] as string
        const result = await new MiddlewareService().verifyToken(token)
        if (result.isSuccess) {
            next()
            req.user = result.decoded
        } else {
            res.status(403).json(middlewareMessages.INVALID)
        }
    }

    async verifyAdmin(req: IRequestWithUser, res: Response, next: NextFunction) {
        const token = await req.headers['token'] as string
        const result = await new MiddlewareService().verifyAdmin(token)
        if (result.isSuccess) {
            next()
            req.user = result.verifyToken.decoded
        } else {
            res.status(403).json(middlewareMessages.INVALID)
        }
    }
}