import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_ACCESS_KEY } from '../configs'
import { IRequestWithUser, IUser } from '../interfaces'
import { middlewareMessages } from '../constant/message'

const middlewareService = {
    verifyToken: async (req: IRequestWithUser, res: Response, next: NextFunction) => {
        const token = req.headers['token'] as string
        console.log(token)
        if (token) {
            const accessToken = token.split(' ')[1]
            const decoded: IUser = await jwt.verify(accessToken, JWT_ACCESS_KEY) as IUser
            req.user = decoded;
            next()
        }
        else {
            res.status(403).json(middlewareMessages[403])
        }
    },
    verifyAdmin: (req: IRequestWithUser, res: Response, next: NextFunction) => {
        middlewareService.verifyToken(req, res, () => {
            if (req.user.isAdmin) {
                next()
            }
            else {
                res.status(403).json(middlewareMessages[403])
            }
        })
    }


}

export default middlewareService;