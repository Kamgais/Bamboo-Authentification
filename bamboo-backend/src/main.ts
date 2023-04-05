import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './configs';

const app: Application = express();
dotenv.config()
const PORT: number = 3001;

app.use('/', (req: Request, res: Response): void => {
   res.send('Hello world!');
});



app.listen(PORT, ():void => {
   console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
   connectToDB()
});