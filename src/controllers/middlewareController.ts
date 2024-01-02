import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_ACCESS_KEY } from '../configs'
import { IRequestWithUser, IUser } from '../interfaces'

const middlewareController = {
    verifyToken: async (req: IRequestWithUser, res: Response, next: NextFunction) => {
        const token = req.headers['token'] as string
        console.log(token)
        if (token) {
            const accessToken = token.split(' ')[1]
            const decoded: IUser = await jwt.verify(accessToken, JWT_ACCESS_KEY) as IUser
            console.log({ decoded })
            req.user = decoded;
            next()
        }
        else {
            res.status(403).json('You are not authenticated')
        }
    },
    verifyAdmin: (req: IRequestWithUser, res: Response, next: NextFunction) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.admin) {
                next()
            }
            else {
                res.status(403).json('You are not authenticated')
            }
        })
    }


}

export default middlewareController;