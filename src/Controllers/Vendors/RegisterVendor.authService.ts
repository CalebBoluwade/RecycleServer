import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { IVendor } from './Vendor.model';
import sendSMSMessage from '../../Integrations/Messages/TwilloSMS.service';
import Vendor from './Vendor.model';
import EmailClient from '../../Integrations/Mails/sendgrid.service';
import sendWhatsAppMessage from '../../Integrations/Messages/TwilioWhatsApp.service';
import GenerateOTP from '../../Security/OTP.secure';
import { CreateVendorInput } from './vendor.schema';
import argo2 from 'argon2';
import { customerStatus, UserSet } from '../../Utils/Types.utils';

const VendorCreation = async (req: Request<{}, {}, CreateVendorInput>, res: Response, next: NextFunction) => {
    const { email, companyName, password, address, phoneNumber }: Partial<IVendor> = req.body;

    const userHashedPwd = await argo2.hash(password);
    const OTP = GenerateOTP();

    const RegionNumberPrefix = '+234';
    const formattedNumber = RegionNumberPrefix + phoneNumber.slice(1, 11);

    const vendor = new Vendor({
        _id: new mongoose.Types.ObjectId(),
        companyName,
        email,
        password: userHashedPwd,
        phoneNumber: formattedNumber,
        userType: UserSet['VENDOR'],
        address,
        vendorStatus: customerStatus['PENDING']
    });

    try {
        const OTP = GenerateOTP();

        const newVendor = await vendor.save();

        if (newVendor) {
            // sendSMSMessage({ phoneNumber: `+234${'8038220361'}`, message: 'Welcome to COMOT YAMA YAMA. Your One Stop Platform for all things waste.' });

            sendWhatsAppMessage({
                phoneNumber: `+234${phoneNumber}`,
                message: `Your OTP Verification CODE is ${OTP.OTP}. Expires in ${OTP.expiresIn / 1000 / 60} Minutes`
            });

            EmailClient({ email: email, subject: 'COMOT YAMA YAMA WELCOMES YOU', body: `TESTING. Your OTP Verification CODE is ${OTP.OTP}. Expires in ${OTP.expiresIn / 1000 / 60} Minutes.` });

            return res.status(201).json({ message: 'Successful', OTP: `A 6 - digit OTP has been sent to ${email} and ${phoneNumber} for user verification.`, data: newVendor });
            // return res.status(201).json({ message: 'Successful', vendor });
        }
    } catch (err: any) {
        // console.log(err.code);
        if ((err.code = 11000)) {
            res.status(400).json({ message: 'Vendor already exist with this email' });
        }
        console.error(err);
        return res.status(403).json({ err });
    }

    // next()
};

export default VendorCreation;
