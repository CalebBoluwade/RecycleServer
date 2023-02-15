import sgMail from '@sendgrid/mail';

sgMail.setApiKey('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');

const TestEmail = ({ email }: { email: string }) => {
    const msg = {
        to: email, // Change to your recipient
        from: 'calebb.jnr@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>'
    };
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error, error?.response?.body?.errors.message);
        });
};

export default TestEmail;
