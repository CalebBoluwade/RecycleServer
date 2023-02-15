import { Request, Response } from 'express';
import Bin, { IBin } from './Bin.model';
import { BinDataSchema } from './bin.schema';
import { handleError } from '../../Utils/ErrorHandler.util';
import mongoose from 'mongoose';
import { customerStatus } from '../Auth/User.model';
import sendSMSMessage from '../../Integrations/Messages/TwilloSMS.service';

export const BinService = async (req: Request<{}, {}, BinDataSchema>, res: Response<any>) => {
    try {
    } catch (error) {
        handleError(error, res);
    }
};

export const CreateBin = async (req: Request<{}, {}, BinDataSchema>, res: Response<any>) => {
    try {
        let { email, address, wasteBags, pickupDate, status, vendorID, imageDescription }: IBin = req.body;

        const wasteBin = new Bin({
            _id: new mongoose.Types.ObjectId(),
            address,
            email,
            imageDescription,
            wasteBags,
            pickupDate,
            vendorID,
            status
        });

        const newBin = await wasteBin.save().then((result) => {
            sendSMSMessage({
                phoneNumber: `+234${'8038220361'}`,
                message: `Dear User, Your Waste of ${wasteBags} bag(s) has been successful scheduled for pick up ${
                    pickupDate === new Date() ? 'today' : pickupDate
                }. Once accepted by the vendor, they'll be in contact with you.`
            });
        });
    } catch (error) {
        handleError(error, res);
    }
};
