// import {Twilio} from 'twilio';
import { Twilio, RequestClient } from 'twilio';
const accountSid = process.env.accountSid;
const authToken = process.env.TWILIO_AUTH_TOKEN;

export const sendSMSMessage = ({ phoneNumber, message }: any) => {
    try {
        const client = new Twilio(String(accountSid), String(authToken));

        client.messages
            .create({ body: message, from: '+19254892658', to: phoneNumber })
            .then((message: any) => console.log(message))
            .catch((e) => console.error(e));
    } catch (err) {
        console.log(err);
    }
};

export default sendSMSMessage;
