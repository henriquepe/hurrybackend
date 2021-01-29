import { createTransport } from 'nodemailer';

import mail from '@config/mail';

interface Request {
    password: string;
    email: string;
}

class SendNewPasswordByEmailService {
    public async execute({ password, email }: Request): Promise<void> {
        const { host, port, auth } = mail;

        const transporter = createTransport({
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

export default SendNewPasswordByEmailService;
