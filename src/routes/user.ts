import { Router } from "express";
import userController from "../services/userService";
import middlewareController from "../services/middlewareService";

export const userRouter = Router()

userRouter.get('/get', middlewareController.verifyToken, userController.getAllUser)
userRouter.delete('/delete/:id', middlewareController.verifyAdmin, userController.deleteUser)
