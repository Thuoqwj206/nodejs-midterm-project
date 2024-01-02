import jwt from 'jsonwebtoken'
import { Response, Request, NextFunction } from 'express'

const middlewareController = {

    verifyToken: (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers['token'] as string
        if (token) {
            const accessToken = token.split(' ')[1]
            console.log(accessToken)
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY as string, (error) => {
                if (error) {
                    res.status(403).json('You are not authenticated')
                }
                next()
            })
        }
        else {
            res.status(403).json('You are not authenticated')
        }
    }

}

export default middlewareController;