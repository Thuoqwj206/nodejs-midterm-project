import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { authMessages } from '../constant/message'
import { IUser } from '../interfaces'
import User from '../models/user'

export class AuthService {
    async registerUSer(body: IUser) {
        const { username, password, email } = body
        if (await User.findOne({ username: username })) {
            return false
        }
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password, salt)

        const newUser = await new User({
            username,
            email,
            password: hashed
        })
        await newUser.save()
        return newUser
    }

    async loginUser(body: IUser) {
        const { username, password } = body
        const user = await User.findOne({ username })
        if (!user) {
            return {
                isSuccess: false, isUsername: true
            }
        }
        const validPassword = await bcrypt.compare(
            password,
            user.password
        )
        if (!validPassword) {
            return {
                isSuccess: false, isPassword: true
            }
        }
        if (user && validPassword) {
            const token = await jwt.sign(
                {
                    id: user.id,
                    isAdmin: user.isAdmin
                },
                process.env.JWT_ACCESS_KEY as string,
                { expiresIn: '30d' }
            )
            return { isSuccess: true, data: { user, token } }
        }


    }

    async logoutUser(req: Request, res: Response) {
        try {
            res.status(200).json(authMessages.LOG_OUT)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}