import passport from "passport";
import { UserService } from "../services";
import { UserMapper } from "../mappers";



export default () => {
    const GoogleStrategy = require('passport-google-oauth20').Strategy;
    const GithubStrategy = require('passport-github2').Strategy;
    

    passport.use(new GoogleStrategy({
        clientID: `${process.env.GOOGLE_AUTH_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_AUTH_SECRET_ID}`,
        callbackURL: `${process.env.DEV_SERVER_URL}/auth/google/callback`
    }, 
     
       async (accessToken:any, refreshToken:any, profile:any, cb:any) => {
            try {
                const userFromDB = await UserService.findByEmail(profile.emails![0].value);
                if(!userFromDB) {
                    const entity = await UserMapper.prototype.toEntity({
                        username: profile.displayName,
                        email: profile.emails![0].value,
                        password: 'authenticated with google',
                        googleId: profile.id,
                        isAccountConfirmed: true
                    })
                    const user = await entity!.save();
    
                    return cb(null,user)
                }
                return cb(null,userFromDB)
            } catch (error) {
                cb(error, {message: 'Internal Server Error'})
            }
        }
    
    ));

    passport.use(new GithubStrategy({
        clientID: `${process.env.GITHUB_AUTH_CLIENT_ID}`,
        clientSecret: `${process.env.GITHUB_AUTH_SECRET_ID}`,
        callbackURL: `${process.env.DEV_SERVER_URL}/auth/github/callback`
    },
     
      async (accessToken: any, refreshToken:any, profile:any, cb:any) => {
       
        const {username} = profile
    
           try {
            const userWithUsername = await UserService.findByUsername(username);
            if(!userWithUsername) {
                const entity = await UserMapper.prototype.toEntity({
                    username: profile.username,
                    email: profile.profileUrl,
                    password: 'authenticated with github',
                    githubId: profile.id,
                    isAccountConfirmed: true
                })
                const user = await entity!.save();
                return cb(null,user)
            }
            return cb(null, userWithUsername)
           } catch (error) {
            cb(error, {message: 'Internal Server Error'})
           }

        }
    
    
    
    
    
    ))

   
}


