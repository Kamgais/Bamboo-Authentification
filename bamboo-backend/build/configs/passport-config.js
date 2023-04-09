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
const passport_1 = __importDefault(require("passport"));
const services_1 = require("../services");
const mappers_1 = require("../mappers");
exports.default = () => {
    const GoogleStrategy = require('passport-google-oauth20').Strategy;
    const GithubStrategy = require('passport-github2').Strategy;
    passport_1.default.use(new GoogleStrategy({
        clientID: `${process.env.GOOGLE_AUTH_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_AUTH_SECRET_ID}`,
        callbackURL: `${process.env.DEV_SERVER_URL}/auth/google/callback`
    }, (accessToken, refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userFromDB = yield services_1.UserService.findByEmail(profile.emails[0].value);
            if (!userFromDB) {
                const entity = mappers_1.UserMapper.prototype.toEntity({
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    password: 'authenticated with google',
                    googleId: profile.id,
                    isAccountConfirmed: true
                });
                const user = yield entity.save();
                return cb(null, user);
            }
            return cb(null, userFromDB);
        }
        catch (error) {
            cb(error, { message: 'Internal Server Error' });
        }
    })));
    passport_1.default.use(new GithubStrategy({
        clientID: `${process.env.GITHUB_AUTH_CLIENT_ID}`,
        clientSecret: `${process.env.GITHUB_AUTH_SECRET_ID}`,
        callbackURL: `${process.env.DEV_SERVER_URL}/auth/github/callback`
    }, (accessToken, refreshToken, profile, cb) => __awaiter(void 0, void 0, void 0, function* () {
        const { username } = profile;
        try {
            const userWithUsername = yield services_1.UserService.findByUsername(username);
            if (!userWithUsername) {
                const entity = mappers_1.UserMapper.prototype.toEntity({
                    username: profile.username,
                    email: profile.profileUrl,
                    password: 'authenticated with github',
                    githubId: profile.id,
                    isAccountConfirmed: true
                });
                const user = yield entity.save();
                return cb(null, user);
            }
            return cb(null, userWithUsername);
        }
        catch (error) {
            cb(error, { message: 'Internal Server Error' });
        }
    })));
};
