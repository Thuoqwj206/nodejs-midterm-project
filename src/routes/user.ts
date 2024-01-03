import { Router } from "express";
import { MiddlewareController, UserController } from "../controllers";

export const userRouter = Router()
const user = new UserController()
const middleware = new MiddlewareController()

userRouter.get('/get', middleware.verifyToken, user.getAllUser)
userRouter.delete('/delete/:id', middleware.verifyAdmin, user.deleteUser)
