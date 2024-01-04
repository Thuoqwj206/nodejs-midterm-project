import { NextFunction } from "express";
import { IRequestWithUser } from "../interfaces";
import { middlewareMessages } from "../constant/message";
import { Response } from 'express'
import { verifyToken, verifyAdmin } from "../services";

export class MiddlewareController {

    async verifyToken(req: IRequestWithUser, res: Response, next: NextFunction) {
        const token = req.headers['token'] as string
        const result = await verifyToken(token)
        if (result.isSuccess) {
            next()
            req.user = result.decoded
        } else {
            res.status(403).json(middlewareMessages.INVALID)
        }
    }

    async verifyAdmin(req: IRequestWithUser, res: Response, next: NextFunction) {
        const token = await req.headers['token'] as string
        const result = await verifyAdmin(token)
        if (result.isSuccess) {
            next()
            req.user = result.user
        } else {
            res.status(403).json(middlewareMessages.INVALID)
        }
    }
}