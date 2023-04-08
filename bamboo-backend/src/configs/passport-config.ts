import passport from "passport";
import { UserService } from "../services";
import { UserMapper } from "../mappers";



export default () => {
    const GoogleStrategy = require('passport-google-oauth20').Strategy;

    passport.use(new GoogleStrategy({
        clientID: `${process.env.GOOGLE_AUTH_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_AUTH_SECRET_ID}`,
        callbackURL: '/bamboo/api/v1/auth/google/callback'
    }, 
     
       async (accessToken:any, refreshToken:any, profile:any, cb:any) => {
            try {
                const userFromDB = await UserService.findByEmail(profile.emails![0].value);
                if(!userFromDB) {
                    const entity = UserMapper.prototype.toEntity({
                        username: profile.displayName,
                        email: profile.emails![0].value,
                        password: 'authenticated with google'
                    })
                    const user = await entity.save();
    
                    return cb(null,user)
                }
                return cb(null,userFromDB)
            } catch (error) {
                cb(error, {message: 'Internal Server Error'})
            }
        }
    
    ))
}


