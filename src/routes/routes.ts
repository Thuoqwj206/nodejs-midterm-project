import express from 'express';
import { authRouter, userRouter, projectRouter } from './index'
import { taskRouter } from './task';

export const allRouter = express.Router()
allRouter.use('/auth', authRouter)
allRouter.use('/user', userRouter)
allRouter.use('/project', projectRouter)
allRouter.use('/task', taskRouter)
