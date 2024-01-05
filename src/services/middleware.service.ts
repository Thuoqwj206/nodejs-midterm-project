
import jwt from 'jsonwebtoken'
import { JWT_ACCESS_KEY } from '../configs'
import { IUser } from '../interfaces'
import { myCache } from './auth.service'


export const verifyToken = async (token: string) => {
    if (!token || myCache.has(token) == true) {
        return { isSuccess: false }
    }
    else {
        const accessToken = token.split(' ')[1]
        const decoded: IUser = await jwt.verify(accessToken, JWT_ACCESS_KEY) as IUser
        return { isSuccess: true, decoded }
    }
}

export const verifyAdmin = async (token: string) => {
    const result = await verifyToken(token)
    if (result.isSuccess) {
        if (result.decoded.isAdmin)
            return {
                isSuccess: true, user: result.decoded
            }
        else {
            return { isSuccess: false }
        }
    } return { isSuccess: false }
}
