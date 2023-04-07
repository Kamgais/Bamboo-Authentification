import { Router } from "express";
import { AuthController } from "../controllers";
import { validateResource } from "../middlewares";
import { CreateUserSchema, ForgotPasswordSchema, LoginUserSchema, ResetPasswordSchema } from "../schemas";


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



export default router;