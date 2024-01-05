import { Types } from "mongoose"

export interface IUser {
    id: Types.ObjectId
    isAdmin: boolean
    username: string
    password: string
    email: string
}