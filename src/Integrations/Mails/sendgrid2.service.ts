import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';

const TestEmail = async ({ email }: { email: string }) => {
    const msg = {
        to: email, // Change to your recipient
        from: 'calebb.jnr@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>'
    };

    // const nodemailer = require("nodemailer");

    const transport = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 465,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'apikey',
            pass: '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'
        },
        logger: true
    });

    const info = await transport
        .sendMail(msg)
        .then(() => {
            console.log('Email sent');
            console.log('Message sent: %s', info);
        })
        .catch((error) => {
            console.error(error, error?.response?.body?.errors.message);
        });
};
// sgMail
//     .send(msg)
//     .then(() => {
//         console.log('Email sent');
//     })
//     .catch((error) => {
//         console.error(error, error?.response?.body?.errors.message);
//     });

export default TestEmail;
