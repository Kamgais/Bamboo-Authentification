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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (receiver, emailContent) => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_USER_PASS // your app password
        }
    };
    const transporter = nodemailer_1.default.createTransport(config);
    // build message
    const message = {
        from: 'bambootaskmanager01@gmail.com',
        to: receiver,
        subject: 'Confirmation Email',
        html: emailContent // html only
    };
    try {
        yield transporter.sendMail(message);
        console.log('Email Send');
        return Promise.resolve(true);
    }
    catch (error) {
        return Promise.reject({ message: 'failed to send email' });
    }
});
exports.sendEmail = sendEmail;
