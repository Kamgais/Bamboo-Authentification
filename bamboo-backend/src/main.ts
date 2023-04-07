import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './configs';
import { authRouter } from './routes';
import cors from 'cors';

const app: Application = express();
dotenv.config()
const PORT: number = 3001;

const corsConfig = {
   origin: true,
   credentials: true,
 };
 
 app.use(cors(corsConfig));
 app.options('*', cors(corsConfig));


// body parser
app.use(express.json())
// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the directory for the views
app.set('views', './src/views');





app.listen(PORT, ():void => {
   console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
   connectToDB()
});

app.use('/bamboo/api/v1/auth', authRouter);