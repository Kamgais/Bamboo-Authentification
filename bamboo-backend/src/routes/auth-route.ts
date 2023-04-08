import { Router } from "express";
import { AuthController } from "../controllers";
import { validateResource } from "../middlewares";
import { CreateUserSchema, ForgotPasswordSchema, LoginUserSchema, ResetPasswordSchema } from "../schemas";
import passport from "passport";


const router = Router();


//-------------------authentification routes---------------------------

router.post('/create-account', validateResource(CreateUserSchema), AuthController.createAccountHandler)
// confirm user account
router.get('/confirm', AuthController.confirmAccountHandler)

// login a user
router.post('/login', validateResource(LoginUserSchema), AuthController.loginUserHandler)

// forgot password
router.post('/forgot-password', validateResource(ForgotPasswordSchema)  ,AuthController.forgotPasswordHandler)

// reset password
router.post('/reset-password/:token', validateResource(ResetPasswordSchema), AuthController.resetPasswordHandler)


// google , github , facebook auth 
// Initialize the Google OAuth2.0 authentication
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// handle the callback after Google has authenticated the user
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: `http://localhost:5173/login/success`,
    failureMessage: 'Cannot login to Google , please try again later',
    failureRedirect: '/login/failed'
}))

// google , github , facebook login failed
router.get('/login/failed', (req,res) => {
    res.status(401).json({
        success: false,
        message: 'failure'
    })
})

// google login success
router.get('/login/success', AuthController.googleCallbackHandler, (req,res) => {
    if(req.user && res.locals.user) {
        res.status(200).json(res.locals.user)
    }
})



export default router;