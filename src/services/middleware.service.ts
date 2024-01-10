import jwt from 'jsonwebtoken';
import NodeCache from 'node-cache';
import { JWT_ACCESS_KEY, myCache } from '../configs';
import { IUser } from '../interfaces';
export class MiddlewareService {
    async verifyToken(token: string): Promise<{ isSuccess: boolean; decoded?: IUser }> {
        if (!token || myCache.has(token.split(' ')[1])) {
            return { isSuccess: false };
        } else {
            const accessToken = token.split(' ')[1];
            const decoded: IUser = await jwt.verify(accessToken, JWT_ACCESS_KEY) as IUser;
            return { isSuccess: true, decoded };
        }
    }

    async verifyAdmin(token: string): Promise<{ isSuccess: boolean; user?: IUser }> {
        const result = await this.verifyToken(token);
        if (result.isSuccess) {
            if (result.decoded.isAdmin) {
                return { isSuccess: true, user: result.decoded };
            } else {
                return { isSuccess: false };
            }
        }
        return { isSuccess: false };
    }
}