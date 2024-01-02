import User from '../models/user'
import { Request, Response } from 'express'


const userController = {
    getAllUser: async (req: Request, res: Response) => {
        try {
            const user = await User.find()
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    deleteUser: async (req: Request, res: Response) => {
        try {
            const user = await User.findById(req.params.id)
            if (!user) {
                return res.status(404).json('Not found user')
            }
            res.status(200).json('Delete Successfully')
            await user.deleteOne()
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default userController;