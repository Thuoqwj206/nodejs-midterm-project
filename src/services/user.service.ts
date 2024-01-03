
import User from '../models/user'


export class UserService {
    async getAllUser() {
        const users = await User.find()
        return users
    }

    async deleteUser(id: string) {
        const user = await User.findById(id)
        if (!user) {
            return { isSuccess: false }
        }
        await user.deleteOne()
        return { isSuccess: true }
    }
}
