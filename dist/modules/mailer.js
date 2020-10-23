"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const mail_1 = __importDefault(require("../config/mail"));
const hbs = require('nodemailer-express-handlebars');
const { user, pass } = mail_1.default.auth;
const { host, port } = mail_1.default;
const transport = nodemailer_1.default.createTransport({
    host,
    port,
    auth: {
        user,
        pass,
    },
});
transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path_1.default.resolve('./src/resources/mail/'),
    extName: '.html',
}));
exports.default = transport;
