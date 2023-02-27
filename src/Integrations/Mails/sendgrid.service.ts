import sgMail, { MailDataRequired } from '@sendgrid/mail';

sgMail.setApiKey(`${process.env.SENDGRID_MAIL_API_KEY}`);

const EmailClient = ({ email, subject, body }: { email: string; subject: string; body: string }) => {
    const msg: MailDataRequired = {
        to: email,
        from: String(process.env.VERIFIED_SENDER),
        subject: subject,
        text: body,
        html: '<strong>and easy to do anywhere, even with Node.js</strong>'
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error: any) => {
            console.error(error, error?.response?.body?.errors.message);
        });
};

export default EmailClient;
