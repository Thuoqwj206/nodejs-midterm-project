import { Router } from "express";
import { AuthController } from "../controllers";
import { AuthService } from "../services";

export const authRouter = Router()
const controller = new AuthController()

authRouter.post('/register', controller.registerUser)
authRouter.post('/login', controller.loginUser)
