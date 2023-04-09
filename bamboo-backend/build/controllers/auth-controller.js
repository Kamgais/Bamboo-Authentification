"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const services_1 = require("../services");
const mappers_1 = require("../mappers");
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const send_email_1 = require("../utils/send-email");
const jwt_utils_1 = require("../utils/jwt-utils");
const base64url_1 = __importDefault(require("base64url"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthController {
    static createAccountHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email } = req.body;
            try {
                // verify if user don't exist
                const existWithUsername = yield services_1.UserService.findByUsername(username);
                if (existWithUsername) {
                    return res.status(400).json({ message: "username already exists" });
                }
                const existWithEmail = yield services_1.UserService.findByEmail(email);
                if (existWithEmail) {
                    return res
                        .status(400)
                        .json({ message: "account already created with this email" });
                }
                // store user to db
                const userInstance = mappers_1.UserMapper.prototype.toEntity(req.body);
                const stored = yield userInstance.save();
                // generate confirmation token
                const confirmationToken = (0, jwt_utils_1.signJWT)({ userId: stored.id }, {
                    expiresIn: '5m'
                });
                const confirmationLink = `${process.env.DEV_SERVER_URL}/auth/confirm?token=${base64url_1.default.encode(confirmationToken)}`;
                const data = { confirmationLink };
                const emailTemplatePath = path_1.default.join(__dirname, "../views/confirm-email.ejs");
                const html = yield ejs_1.default.renderFile(emailTemplatePath, data);
                // send email confirmation to user account
                const isSend = yield (0, send_email_1.sendEmail)(email, html);
                const dto = mappers_1.UserMapper.prototype.toDto(stored);
                return res.status(201).json(dto);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    static confirmAccountHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // extract token from request query
            const { token } = req.query;
            const decodedToken = base64url_1.default.decode(token);
            const { decoded, valid, expired } = (0, jwt_utils_1.verifyJWT)(decodedToken);
            if (!valid && expired) {
                return res.status(403).send('link is already expired');
            }
            if (!valid && !expired) {
                return res.status(403).send('You don\'t have authorization');
            }
            if (decoded) {
                const { userId } = decoded;
                try {
                    const user = yield services_1.UserService.updateById({ isAccountConfirmed: true }, userId);
                    const data = { appLink: process.env.FRONTEND_URL, name: user === null || user === void 0 ? void 0 : user.username };
                    return res.status(200).render('successfull-confirmed', data);
                }
                catch (error) {
                    return res.status(500).json({ message: error.message });
                }
            }
        });
    }
    static loginUserHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // extract the user infos
            const { username, password } = req.body;
            try {
                const isInDB = yield services_1.UserService.findByUsername(username);
                if (!isInDB)
                    return res.status(400).json({ message: 'Username don\'t exist' });
                const matched = yield bcrypt_1.default.compare(password, isInDB.password);
                if (!matched)
                    return res.status(400).json({ message: 'password isn\'t correct' });
                // generate access and refresh token
                const accessToken = (0, jwt_utils_1.signJWT)({ userId: isInDB.id }, {
                    expiresIn: '55m'
                });
                const refreshToken = (0, jwt_utils_1.signJWT)({ userId: isInDB.id }, {
                    expiresIn: '1y'
                });
                // set response cookies
                res.cookie("accessToken", accessToken, {
                    maxAge: 3.3e6,
                    httpOnly: true,
                    domain: "localhost",
                    path: "/",
                    sameSite: "none",
                    secure: true,
                });
                res.cookie("refreshToken", refreshToken, {
                    maxAge: 3.154e10,
                    httpOnly: true,
                    domain: "localhost",
                    path: "/",
                    sameSite: "none",
                    secure: true,
                });
                const dto = mappers_1.UserMapper.prototype.toDto(isInDB);
                req.session.user = dto;
                return res.status(200).json(dto);
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    static forgotPasswordHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                const userWithEmail = yield services_1.UserService.findByEmail(email);
                if (!userWithEmail) {
                    return res.status(404).json({ message: 'No user with this email' });
                }
                const resetPasswordToken = (0, jwt_utils_1.signJWT)({ userId: userWithEmail.id }, { expiresIn: '10m' });
                const resetPasswordLink = `${process.env.FRONTEND_URL}/reset-password/${base64url_1.default.encode(resetPasswordToken)}`;
                const data = { resetPasswordLink };
                const emailTemplatePath = path_1.default.join(__dirname, "../views/reset-password.ejs");
                const html = yield ejs_1.default.renderFile(emailTemplatePath, data);
                const isSend = yield (0, send_email_1.sendEmail)(email, html);
                return res.status(200).json({ message: 'Reset link is send' });
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    static resetPasswordHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password } = req.body;
            const { token } = req.params;
            const decodedToken = base64url_1.default.decode(token);
            // verify token 
            const { decoded, valid, expired } = (0, jwt_utils_1.verifyJWT)(decodedToken);
            if (!decoded && expired) {
                return res.status(403).json({ message: 'Link is already, please request another link' });
            }
            if (!decoded && !expired) {
                return res.status(403).json({ message: 'No authorization for this action' });
            }
            const { userId } = decoded;
            try {
                const user = yield services_1.UserService.findById(userId);
                if (!user) {
                    return res.status(404).json({ message: 'No user found with this id' });
                }
                // const dto = UserMapper.prototype.toDto(user);
                const userWithNewPassword = yield services_1.UserService.updateById({ password }, userId);
                return res.status(204).json();
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    static successCallbackHandler(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user) {
                const id = req.user.id;
                try {
                    // generate tokens
                    const accessToken = (0, jwt_utils_1.signJWT)({ userId: id }, { expiresIn: '15m' });
                    const refreshToken = (0, jwt_utils_1.signJWT)({ userId: id }, { expiresIn: '1y' });
                    const user = yield services_1.UserService.findById(String(id));
                    if (!user) {
                        res.status(404).json({ message: 'user not found with this id' });
                    }
                    res.cookie('accessToken', accessToken, {
                        maxAge: 900000,
                        httpOnly: true,
                        domain: "localhost",
                        path: "/",
                        sameSite: "none",
                        secure: true,
                    });
                    res.cookie('refreshToken', refreshToken, {
                        maxAge: 3.154e10,
                        httpOnly: true,
                        domain: "localhost",
                        path: "/",
                        sameSite: "none",
                        secure: true,
                    });
                    const dto = mappers_1.UserMapper.prototype.toDto(user);
                    res.locals.user = dto;
                    next();
                }
                catch (error) {
                    return res.status(500).json({ message: error.message });
                }
            }
            else {
                return res.status(403).json({ message: 'No Authorisation' });
            }
        });
    }
    static logoutHandler(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user) {
                req.logout((err) => {
                    if (err) {
                        res.status(500).json({ message: 'Failed to logout' });
                    }
                    res.locals.user = null;
                    res.status(200).json({ message: 'logout successfull' });
                });
            }
            else if (req.session.user) {
                req.session.destroy((err) => {
                    if (err) {
                        res.status(500).json({ message: 'Failed to logout' });
                    }
                    res.status(200).json({ message: 'logout successfull' });
                });
            }
        });
    }
}
exports.AuthController = AuthController;
