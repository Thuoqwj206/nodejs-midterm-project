import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth'
import userRouter from '../src/routes/user'
import projectRouter from './routes/project'

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
dotenv.config()
const port = process.env.PORT
mongoose.connect(process.env.MONGODB as string)

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/project', projectRouter)

app.listen(port, () => {
    console.log(`Sever is running on port ${port}`)
})