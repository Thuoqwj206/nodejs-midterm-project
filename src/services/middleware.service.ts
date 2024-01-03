
import jwt from 'jsonwebtoken'
import { JWT_ACCESS_KEY } from '../configs'
import { IUser } from '../interfaces'

export class MiddlewareService {
    async verifyToken(token: string) {
        if (token) {
            const accessToken = token.split(' ')[1]
            const decoded: IUser = await jwt.verify(accessToken, JWT_ACCESS_KEY) as IUser
            return { isSuccess: true, decoded }
        }
        else {
            return { isSuccess: false }
        }
    }
    async verifyAdmin(token: string) {
        const verifyToken = await new MiddlewareService().verifyToken(token)
        if (verifyToken.isSuccess) {
            return {
                isSuccess: true, verifyToken
            }
        }
        else {
            return { isSuccess: false }
        }
    }
}
