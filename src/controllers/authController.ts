import bcrypt from 'bcrypt'
import User from '../models/user'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const authController = {
    registerUSer: async (req: Request, res: Response) => {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)

            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed
            })

            const user = await newUser.save()
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    loginUser: async (req: Request, res: Response) => {
        try {
            const user = await User.findOne({ username: req.body.username })
            if (!user) {
                return res.status(404).json('Username not found')
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if (!validPassword) {
                return res.status(404).json('Wrong password')
            }
            if (user && validPassword) {
                const token = jwt.sign(
                    {
                        id: user.id,
                        admin: user.isAdmin
                    },
                    process.env.JWT_ACCESS_KEY as string,
                    { expiresIn: '30d' }
                )
                res.json({ user, token })
            }
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    logoutUser: async (req: Request, res: Response) => {
        try {
            res.status(200).json('Logout Successfully')
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default authController