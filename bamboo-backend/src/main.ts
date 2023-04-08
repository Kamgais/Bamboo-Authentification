import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './configs';
import { authRouter } from './routes';
import cors from 'cors';
import session from 'express-session';
import passport from "passport";
import passportConfig from './configs/passport-config';

const app: Application = express();
dotenv.config()
const PORT: number = 3001;

const corsConfig = {
   origin: true,
   credentials: true,
 };
 
 app.use(cors(corsConfig));
 app.options('*', cors(corsConfig));

 // Set up session management
app.use(session({
   secret: 'my-secret',
   resave: false,
   saveUninitialized: false,
   cookie: { secure: false, maxAge: 3600000 } // 1hour
  }));


  // Initialize Passport.js and set up session management
  app.use(passport.initialize())
  app.use(passport.session())


  passportConfig();

  // Serialize and deserialize user objects
passport.serializeUser((user, done) => {
   console.log(user, 'hey')
   done(null, user);
  });
  
  passport.deserializeUser((user: any, done) => {
   done(null, user);
  });


// body parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the directory for the views
app.set('views', './src/views');





app.listen(PORT, ():void => {
   console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
   connectToDB()
});

app.use('/bamboo/api/v1/auth', authRouter);