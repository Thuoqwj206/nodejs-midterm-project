import { Router } from "express";
import { AuthController, MiddlewareController } from "../controllers";

export const authRouter = Router()
const controller = new AuthController()
const middleware = new MiddlewareController()
authRouter.post('/register', controller.registerUser)
authRouter.post('/login', controller.loginUser)
authRouter.get('/logout', middleware.verifyToken, controller.logoutUser)