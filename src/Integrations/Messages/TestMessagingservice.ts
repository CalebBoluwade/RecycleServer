import { Request, Response } from 'express';
import sendSMSMessage from './TwilloSMS.service';
import sendWhatsAppMessage from './TwilioWhatsApp.service';

export const TestMessagingService = async (req: Request, res: Response<any>) => {
    let phoneNumber = req.query.phoneNumber;

    try {
        sendSMSMessage({
            phoneNumber: `+234${phoneNumber}`,
            message: `Your COMOT YAMA CODE IS 734975`
        });

        sendWhatsAppMessage({
            phoneNumber: `+234${phoneNumber}`,
            message: `join each-probably`
        });
    } catch (error) {
        console.error(error);
    }
};
