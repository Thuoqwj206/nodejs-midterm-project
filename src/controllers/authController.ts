import { IUser } from "../interfaces";
import authService from "../services/authService";

export class AuthController {
    private authService: any;
    constructor() {
        this.authService = authService;
    }

    public registerUser = (): IUser => {
        return this.authService.registerUSer
    }

    public loginUser = (): { IUser, string } => {
        return this.authService.loginUser
    }

    public logoutUser = () => {
        return this.authService.logoutUser
    }
}

