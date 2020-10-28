"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
const mail_1 = __importDefault(require("../../config/mail"));
class SendNewPasswordByEmailService {
    async execute({ password, email }) {
        const { host, port, auth } = mail_1.default;
        const transporter = nodemailer_1.createTransport({
            host,
            port,
            secure: false,
            auth,
        });
        await transporter.sendMail({
            from: 'Hurry APP',
            to: email,
            subject: 'Nova senha criada',
            html: `<h1>Sua nova senha é: <strong>${password}</strong></h1>`,
        });
    }
}
exports.default = SendNewPasswordByEmailService;
