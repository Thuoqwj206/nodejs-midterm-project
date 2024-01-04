
import User from '../models/user'


export const getAllUser = async () => {
    const users = await User.find()
    return users
}

export const deleteUser = async (id: string) => {
    const user = await User.findById(id)
    if (!user) {
        return { isSuccess: false }
    }
    await user.deleteOne()
    return { isSuccess: true }
}
