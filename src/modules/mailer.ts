/* eslint-disable @typescript-eslint/no-var-requires */
import nodemailer from 'nodemailer';
import path from 'path';
import mail from '../config/mail';

const hbs = require('nodemailer-express-handlebars');

const { user, pass } = mail.auth;
const { host, port } = mail;

const transport = nodemailer.createTransport({
    host,
    port,
    auth: {
        user,
        pass,
    },
});

transport.use(
    'compile',
    hbs({
        viewEngine: 'handlebars',
        viewPath: path.resolve('./src/resources/mail/'),
        extName: '.html',
    }),
);

export default transport;
