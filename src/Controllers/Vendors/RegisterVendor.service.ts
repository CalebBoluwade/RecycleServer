import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import { customerStatus, IVendor } from './Vendor.model';
import sendSMSMessage from '../Integrations/Messages/Twillo.service';
import VendorModel from './Vendor.model';

const UserCreation = async (req: Request, res: Response, next: NextFunction) => {
    const { email, userType, fullName, password, address, phoneNumber }: IVendor = req.body;

    const newVendor = new VendorModel({
        _id: new mongoose.Types.ObjectId(),
        fullName,
        email,
        password,
        userType,
        phoneNumber,
        address,
        status: customerStatus['PENDING']
    });

    try {
        sendSMSMessage({ phoneNumber: `+234${'8038220361'}` });
        const vendor = await newVendor.save();
        return res.status(201).json({ message: 'Successful', vendor });
    } catch (err: any) {
        // console.log(err.code);
        if ((err.code = 11000)) {
            res.status(400).json({ message: 'User aleady exist with this email' });
        }
        console.error(err);
        return res.status(403).json({ err });
    }

    // next()
};

export default UserCreation;
