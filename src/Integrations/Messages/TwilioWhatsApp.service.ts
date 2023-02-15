// import {Twilio} from 'twilio';
import { Twilio } from 'twilio';
const accountSid = process.env.accountSid;
const authToken = process.env.TWILIO_AUTH_TOKEN;

export const sendWhatsAppMessage = ({ phoneNumber, message }: any) => {
    try {
        const client = new Twilio(String(accountSid), String(authToken));

        client.messages
            .create({ body: message, from: 'whatsapp:+14155238886', to: `whatsapp:${phoneNumber}` })
            .then((message: any) => console.log(message))
            .catch((e) => console.error(e));
    } catch (err) {
        console.log(err);
    }
};

// 14155238886;

// Your Waste Recycle Bin pickup is scheduled for July 21 at 3PM

export default sendWhatsAppMessage;
