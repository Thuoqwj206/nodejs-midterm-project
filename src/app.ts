import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { PORT } from './configs'
import { allRouter } from './routes'

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
dotenv.config()
const port = PORT
mongoose.connect(process.env.MONGODB as string)

app.use('/', allRouter)


app.listen(port, () => {
    console.log(`Sever is running on port ${port}`)
})