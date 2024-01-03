import { Router } from "express";
import authController from "../services/authService";


export const authRouter = Router()

authRouter.post('/register', authController.registerUSer)
authRouter.post('/login', authController.loginUser)
