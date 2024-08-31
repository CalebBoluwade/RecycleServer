import sgMail, { MailDataRequired } from '@sendgrid/mail';

sgMail.setApiKey(`${process.env.SENDGRID_MAIL_API_KEY}`);

const EmailClient = ({ email, subject, body }: { email: string; subject: string; body: string }) => {
    const msg: MailDataRequired = {
        to: email,
        from: {
            email: String(process.env.VERIFIED_SENDER),
            name: 'COMOT YAMA YAMA'
        },
        subject: subject,
        text: body,
        html: body
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent to:', email);
        })
        .catch((error: any) => {
            console.error(error, error?.response?.body?.errors.message);
        });
};

export default EmailClient;
