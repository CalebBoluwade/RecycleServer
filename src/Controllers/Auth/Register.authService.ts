import { NextFunction, Request, Response } from 'express';
import GenerateOTP from '../../Security/OTP.secure';
import { CreateUserInput, VerifyUserInput } from './auth.schema';
import mongoose from 'mongoose';
import User, { IUser } from './User.model';
import sendSMSMessage from '../../Integrations/Messages/TwilloSMS.service';
import EmailClient from '../../Integrations/Mails/mail.service';
import sendWhatsAppMessage from '../../Integrations/Messages/TwilioWhatsApp.service';
import { customerStatus } from '../../Utils/Types.utils';
// import argo2 from 'argon2';
import lodash from 'lodash';
import { Res } from '../../Schema/Response.schema';

const UserCreation = async (req: Request<{}, {}, CreateUserInput>, res: Response<Res>, next: NextFunction) => {
    const { email, userType, address, fullName, password, phoneNumber }: Partial<IUser> = req.body;

    try {
        // const userHashedPwd = await argo2.hash(password);
        const OTP = GenerateOTP();

        const RegionNumberPrefix = '+234';
        const formattedNumber = RegionNumberPrefix + phoneNumber.slice(1, 11);

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            fullName,
            address,
            email,
            password,
            userType,
            verificationCode: OTP,
            refCode: 'NA',
            refCodeCount: 0,
            phoneNumber: formattedNumber,
            status: customerStatus['PENDING']
        });
        const newUser = await user.save();

        if (newUser) {
            // sendSMSMessage({ phoneNumber: formattedNumber, message: 'Welcome to COMOT YAMA YAMA. Your COMOT YAMA YAMA OTP verification CODE is ${OTP.OTP} Your One Stop Platform for all things waste.' });

            sendWhatsAppMessage({
                phoneNumber: formattedNumber,
                message: `Your COMOT YAMA YAMA OTP verification CODE is ${OTP.OTP}. Expires in ${OTP.expiresIn / 1000 / 60} Minutes.`
            });

            EmailClient({
                email: email,
                subject: 'COMOT YAMA YAMA WELCOMES YOU',
                body: `TESTING. Your COMOT YAMA YAMA OTP verification CODE is ${OTP.OTP}. Expires in ${OTP.expiresIn / 1000 / 60} Minutes.`
            });

            const omittedData = lodash.omit(newUser, ['refCode', 'refCodeCount', 'password', '__v']);

            return res.status(201).json({
                message: 'Successful',
                accessToken: `A 6 - digit OTP has been sent to ${email} and ${formattedNumber} for user verification.`,
                data: omittedData
            });
        }
    } catch (err: any) {
        // console.error(err);
        if ((err.code = 11000)) {
            res.status(400).json({ message: 'User already exists.', data: null, error: err });
        }
    }
};

export const VerifyUser = async (req: Request<VerifyUserInput>, res: Response) => {
    const id = req.params.id;
    const verificationCode = req.params.verificationCode;

    let user = await User.findById({ id });

    if (!user) {
    }

    if (user?.status === customerStatus['ACTIVE']) {
        res.send({ message: 'User is already verified' });
    }

    if (verificationCode === user?.verificationCode.OTP && Date.now() - user.verificationCode.expirationTime < user.verificationCode.expiresIn) {
        user.status = customerStatus['ACTIVE'];

        user.save();

        res.send({ message: 'User successfully verified' });
    }
};

const ForgotPassword = async (req: Request<VerifyUserInput>, res: Response) => {};

export default UserCreation;
