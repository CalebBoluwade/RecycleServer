import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import User, { customerStatus, IUser } from './User.model';
import sendSMSMessage from '../../Integrations/Messages/TwilloSMS.service';
import { createUserSchema } from './auth.schema';

const UserCreation = async (req: Request<{}, {}, createUserSchema['body']>, res: Response, next: NextFunction) => {
    const { email, userType, address, fullName, password, phoneNumber } = req.body;

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        fullName,
        address,
        email,
        password,
        userType,
        refCode: 'NA',
        refCodeCount: 0,
        phoneNumber,
        status: customerStatus['PENDING']
    });

    try {
        sendSMSMessage({ phoneNumber: `+234${'8038220361'}`, message: 'Welcome to COMOT YAMA YAMA. Your One Stop Platform for things waste.' });
        const newUser = await user.save();

        return res.status(201).json({ message: 'Successful' });
    } catch (err: any) {
        // console.log(err.code);
        if ((err.code = 11000)) {
            res.status(409).json({ message: 'User aleady exist with this email' });
        }
        console.error(err);
        return res.status(403).json({ err });
    }

    // next()
};

export default UserCreation;
