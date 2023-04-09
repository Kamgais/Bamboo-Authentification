"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const schemas_1 = require("../schemas");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
//-------------------authentification routes---------------------------
router.post('/create-account', (0, middlewares_1.validateResource)(schemas_1.CreateUserSchema), controllers_1.AuthController.createAccountHandler);
// confirm user account
router.get('/confirm', controllers_1.AuthController.confirmAccountHandler);
// login a user
router.post('/login', (0, middlewares_1.validateResource)(schemas_1.LoginUserSchema), controllers_1.AuthController.loginUserHandler);
// forgot password
router.post('/forgot-password', (0, middlewares_1.validateResource)(schemas_1.ForgotPasswordSchema), controllers_1.AuthController.forgotPasswordHandler);
// reset password
router.post('/reset-password/:token', (0, middlewares_1.validateResource)(schemas_1.ResetPasswordSchema), controllers_1.AuthController.resetPasswordHandler);
// google , github , facebook auth 
// Initialize the Google OAuth2.0 authentication
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/github', passport_1.default.authenticate('github', { scope: ['profile'] }));
// handle the callback after Google has authenticated the user
router.get('/google/callback', passport_1.default.authenticate('google', {
    successRedirect: `${process.env.FRONTEND_URL}/login/success`,
    failureMessage: 'Cannot login to Google , please try again later',
    failureRedirect: '/login/failed'
}));
// handle the callback after Github has authenticated
router.get('/github/callback', passport_1.default.authenticate('github', {
    successRedirect: `${process.env.FRONTEND_URL}/login/success`,
    failureMessage: 'Cannot login to Github , please try again later',
    failureRedirect: '/login/failed'
}));
// google , github , facebook login failed
router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'failure'
    });
});
// google login success
router.get('/login/success', controllers_1.AuthController.successCallbackHandler, (req, res) => {
    if (req.user && res.locals.user) {
        res.status(200).json(res.locals.user);
    }
});
// google , github logout
router.put('/logout', controllers_1.AuthController.logoutHandler);
exports.default = router;
