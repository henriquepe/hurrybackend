"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
var nodemailer_1 = __importDefault(require("nodemailer"));
var path_1 = __importDefault(require("path"));
var mail_1 = __importDefault(require("../config/mail"));
var hbs = require('nodemailer-express-handlebars');
var _a = mail_1.default.auth, user = _a.user, pass = _a.pass;
var host = mail_1.default.host, port = mail_1.default.port;
var transport = nodemailer_1.default.createTransport({
    host: host,
    port: port,
    auth: {
        user: user,
        pass: pass,
    },
});
transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path_1.default.resolve('./src/resources/mail/'),
    extName: '.html',
}));
exports.default = transport;
