import { IUser } from "../interfaces";
import userService from "../services/userService";

export class userController {

    private userService;

    constructor() {
        this.userService = userService
    }

    public getAllUser = (): [IUser] => {
        return this.userService.getAllUser
    }

    public deleteUser = () => {
        return this.userService.deleteUser
    }
}