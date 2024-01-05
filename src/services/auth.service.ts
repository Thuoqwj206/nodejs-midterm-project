import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { IUser } from '../interfaces'
import User from '../models/user'
import NodeCache from 'node-cache'
import { JWT_ACCESS_KEY } from '../configs'


export const myCache = new NodeCache()
myCache.set('keyWithTTL', 'value', 864000)
export const registerUSer = async (body: IUser) => {
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

export const loginUser = async (body: IUser) => {
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
            JWT_ACCESS_KEY as string,
            { expiresIn: '30d' }
        )
        return { isSuccess: true, data: { user, token } }
    }
}
export const logoutUser = async (token: string) => {
    console.log(token)
    myCache.set(token, 1)
}