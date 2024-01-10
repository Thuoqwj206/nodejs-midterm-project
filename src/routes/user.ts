import { Router } from "express";
import { MiddlewareController, UserController } from "../controllers";

export const userRouter = Router()
const user = new UserController()
const middleware = new MiddlewareController()

userRouter.get('/', middleware.verifyToken, user.getAllUser)
userRouter.get('/task', middleware.verifyToken, user.getUserTask)
userRouter.delete('/delete/:id', middleware.verifyAdmin, user.deleteUser)
userRouter.get('/:id', middleware.verifyAdmin, user.getUserById)
userRouter.get('/project', middleware.verifyToken, user.getUserProjects)
userRouter.put('/:id', middleware.verifyAdmin, user.updateUser)
