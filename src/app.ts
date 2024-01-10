import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { PORT } from './configs';
import { allRouter } from './routes';
import { DataSource, createConnection, getConnectionManager } from 'typeorm';

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
dotenv.config();
const port = PORT;

createConnection()
    .then(() => {
        console.log('Connected to the database');
        app.get('/', (req, res) => {
            res.send('Hello, TypeORM!');
        });

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });