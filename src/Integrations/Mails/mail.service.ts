import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
// const nodemailer = require("nodemailer");

const RegisterMailer = async ({ email, subject, body }: { email: string; subject: string; body: string }) => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'calebb.jnr@gmail.com',
            pass: 'pbydjdoqpwkvtoel'
        },
        logger: true
    });

    let mailOptions = {
        from: 'COMOT YAMA YAMA <calebb.jnr@gmail.com>',
        to: email,
        subject: subject,
        text: body,
        html: body
    };

    const info = await transport.sendMail(mailOptions);

    console.log('Message sent: %s', info.response);
};

export default RegisterMailer;
