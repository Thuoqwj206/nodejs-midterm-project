
import jwt from 'jsonwebtoken'
import { JWT_ACCESS_KEY } from '../configs'
import { IUser } from '../interfaces'


export const verifyToken = async (token: string) => {
    if (token) {
        const accessToken = token.split(' ')[1]
        const decoded: IUser = await jwt.verify(accessToken, JWT_ACCESS_KEY) as IUser
        return { isSuccess: true, decoded }
    }
    else {
        return { isSuccess: false }
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
