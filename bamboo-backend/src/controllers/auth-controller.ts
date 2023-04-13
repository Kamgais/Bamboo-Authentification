import { NextFunction, Request, Response } from "express";
import { CreateUserInput, ForgotPasswordInput, LoginUserInput, UserDto } from "../interfaces";
import { ApiResponseType, ErrorMessage } from "../utils/types";
import { UserService } from "../services";
import { UserMapper } from "../mappers";
import path from "path";
import ejs from "ejs";
import { sendEmail } from "../utils/send-email";
import { signJWT, verifyJWT } from "../utils/jwt-utils";
import base64url from "base64url";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { ResetPasswordInput } from "../interfaces/user-dto";


export class AuthController {
  static async createAccountHandler(
    req: Request<{}, {}, CreateUserInput>,
    res: Response<UserDto | ErrorMessage>
  ): Promise<Response> {
    const { username, email } = req.body;

    try {
      // verify if user don't exist
      const existWithUsername = await UserService.findByUsername(username);
      if (existWithUsername) {
        return res.status(400).json({ message: "username already exists" });
      }
      const existWithEmail = await UserService.findByEmail(email);
      if (existWithEmail) {
        return res
          .status(400)
          .json({ message: "account already created with this email" });
      }

      // store user to db
      const userInstance = await UserMapper.prototype.toEntity(req.body);
      const stored = await userInstance!.save();
      // generate confirmation token
      const confirmationToken = signJWT({userId: stored.id}, {
        expiresIn: '5m'
      });
      const confirmationLink = `${process.env.DEV_SERVER_URL}/auth/confirm?token=${base64url.encode(confirmationToken)}`;
      const data = { confirmationLink };
      const emailTemplatePath = path.join(__dirname, "../views/confirm-email.ejs");
      const html = await ejs.renderFile(emailTemplatePath, data);
      // send email confirmation to user account
      const isSend = await sendEmail(email, html);
      const dto = UserMapper.prototype.toDto(stored);
      return res.status(201).json(dto);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }



  static async confirmAccountHandler(req: Request, res: Response): Promise<any> {
    // extract token from request query
    const {token} = req.query;
    const decodedToken = base64url.decode(token as string)
    const {decoded,valid, expired} = verifyJWT(decodedToken);
    if(!valid && expired) {
        return res.status(403).send('link is already expired')
    }
    if(!valid && !expired) {
        return res.status(403).send('You don\'t have authorization' )
    }
    if(decoded) {
        const {userId} = decoded as JwtPayload;
       try {
        const user = await UserService.updateById({isAccountConfirmed: true}, userId)
        const data = {appLink: process.env.FRONTEND_URL, name:user?.username}
        return res.status(200).render('successfull-confirmed', data)
       } catch (error: any) {
        return res.status(500).json({message: error.message})
       }
    }
  }


  static async loginUserHandler(req: Request<{},{}, LoginUserInput>, res: Response<UserDto | ErrorMessage>): Promise<Response> {
    // extract the user infos
    const {username, password} = req.body;
    try {
        const isInDB = await UserService.findByUsername(username);
        if(!isInDB) return res.status(400).json({message: 'Username don\'t exist'});
        const matched = await bcrypt.compare(password, isInDB.password);
        if(!matched) return res.status(400).json({message: 'password isn\'t correct'});
    
        // generate access and refresh token
        const accessToken = signJWT({userId: isInDB.id}, {
            expiresIn: '55m'
        })
        const refreshToken = signJWT({userId: isInDB.id}, {
            expiresIn: '1y'
        })

        // set response cookies
        res.cookie("accessToken", accessToken, {
            maxAge: 3.3e6, // 55 mins
            httpOnly: true,
            domain: "localhost",
            path: "/",
            sameSite: "none",
            secure: true,
          });

          res.cookie("refreshToken", refreshToken, {
            maxAge: 3.154e10, // 1 year
            httpOnly: true,
            domain: "localhost",
            path: "/",
            sameSite: "none",
            secure: true,
          });
          const dto = UserMapper.prototype.toDto(isInDB);
          req.session.user = dto;
        
          return res.status(200).json(dto);
    } catch (error: any) {
        return res.status(500).json({message : error.message})
    }
  }



  static async forgotPasswordHandler(req: Request<{},{},ForgotPasswordInput>, res: Response): Promise<Response> {
      const {email} = req.body;

      try {
        const userWithEmail = await UserService.findByEmail(email);
        if(!userWithEmail) {
          return res.status(404).json({message: 'No user with this email'})
        }
        const resetPasswordToken = signJWT({userId: userWithEmail.id}, {expiresIn: '10m'});
        const resetPasswordLink = `${process.env.FRONTEND_URL}/reset-password/${base64url.encode(resetPasswordToken)}`;
        const data = {resetPasswordLink};
        const emailTemplatePath = path.join(__dirname, "../views/reset-password.ejs");
        const html = await ejs.renderFile(emailTemplatePath, data);
        const isSend = await sendEmail(email, html);
        return  res.status(200).json({message: 'Reset link is send'})
      } catch (error: any) {
       return res.status(500).json({message: error.message})
      }
  }


  static async resetPasswordHandler(req: Request<{token: string},{},ResetPasswordInput>, res: Response): Promise<Response> {
    const {password} = req.body;
    const {token} = req.params;
    const decodedToken = base64url.decode(token);

    // verify token 
    const {decoded, valid, expired} = verifyJWT(decodedToken);
    
    if(!decoded && expired) {
      return res.status(403).json({message: 'Link is already, please request another link'})
    }
    if(!decoded && !expired) {
      return res.status(403).json({message: 'No authorization for this action'})
    }
    const {userId} = decoded as JwtPayload ;
    try {
      const user = await UserService.findById(userId);
      if(!user) {
        return res.status(404).json({message: 'No user found with this id'})
      }
      // const dto = UserMapper.prototype.toDto(user);
      const userWithNewPassword = await UserService.updateById({password}, userId);
      return res.status(204).json();
    } catch (error: any) {
      return res.status(500).json({message: error.message})
    }
    

  }


  static async successCallbackHandler(req:Request,res: Response, next: NextFunction) {
    if(req.user) {
      const id = (req.user as UserDto).id;
      
    try {
      // generate tokens
      const accessToken = signJWT({userId: id}, {expiresIn: '15m'})
      const refreshToken = signJWT({userId: id}, {expiresIn: '1y'})
      const user = await UserService.findById(id!);
      if(!user) {
        res.status(404).json({message: 'user not found with this id'})
      }
      res.cookie('accessToken', accessToken, {
      maxAge: 900000, // 15 mins
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "none",
      secure: true,
      })

      res.cookie('refreshToken', refreshToken, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "none",
      secure: true,
      })
      const dto = UserMapper.prototype.toDto(user!);
      res.locals.user = dto;
      next();
    } catch (error:any) {
      return res.status(500).json({message: error.message})
    }
    } else {
      return res.status(403).json({message: 'No Authorisation'})
    }
  }


  static async logoutHandler(req: Request, res: Response) {
    if(req.user) {
      req.logout((err: any) => {
        if(err) {
          res.status(500).json({message: 'Failed to logout'});
        }
        res.locals.user = null;
        res.status(200).json({message: 'logout successfull'});
      });
    } else if(req.session.user) {
      req.session.destroy((err: any) => {
        if(err) {
          res.status(500).json({message: 'Failed to logout'})
        }
        res.status(200).json({message: 'logout successfull'})
      });
    }
  
    
  }
}
