import { userMessages } from '../constant/message'
import User from '../models/user'
import { Request, Response } from 'express'


const userService = {
    getAllUser: async (req: Request, res: Response) => {
        try {
            const users = await User.find()
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    deleteUser: async (req: Request, res: Response) => {
        try {
            const user = await User.findById(req.params.id)
            if (!user) {
                return res.status(404).json(userMessages[404])
            }
            res.status(200).json(userMessages.DELETE)
            await user.deleteOne()
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default userService;