import { Request, Response } from 'express';
import Bin, { IBin, IBinModel } from './Bin.model';
import { BinDataSchema, FetchBinInput } from './bin.schema';
import { handleError } from '../../Utils/ErrorHandler.util';
import mongoose from 'mongoose';
import { CollectorStatus, CompletionStatus, wasteBinData } from '../../Utils/Types.utils';
import Vendor from '../Vendor/Vendor.model';
import lodash from 'lodash';
import User from '../Auth/User.model';
import dayjs from 'dayjs';
import { Res } from '../../Schema/Response.schema';
import EmailClient from '../../Integrations/Mails/mail.service';
import sendWhatsAppMessage from '../../Integrations/Messages/TwilioWhatsApp.service';
import util from 'node:util';

export const FetchOtherWasteMaterials = (_: Request, res: Response<Res>) => {
    const dataSet = [
        { key: '0', value: 'Office Paper [Shredded]' },
        { key: '1', value: 'Office Paper [Unshredded]' },
        { key: '2', value: 'Appliances' },
        { key: '3', value: 'Aluminium Cans' },
        { key: '4', value: 'Nylon(s)', disabled: true },
        { key: '5', value: 'PVC Pipes' },
        { key: '6', value: 'Cartons' },
        { key: '8', value: 'Plastic' },
        { key: '9', value: 'Glass' }
    ];

    res.send({ message: '', data: dataSet });
};

export const CreateNewBin = async (req: Request<{}, {}, BinDataSchema>, res: Response<any>) => {
    try {
        let { ownerId, address, wasteBags, wasteMaterials, pickupDate, phoneNumber, vendor, imageDescription }: Partial<IBin> = req.body;

        const wasteBin = new Bin({
            _id: new mongoose.Types.ObjectId(),
            address,
            ownerId,
            phoneNumber,
            imageDescription,
            wasteBags,
            wasteMaterials,
            pickupDate,
            formatDate: dayjs(pickupDate).fromNow(),
            vendor,
            CompletionStatus: CompletionStatus['PENDING'],
            CollectorStatus: CollectorStatus['PENDING']
        });

        // console.log(getVendor);
        const VendorDetails = await Vendor.findById({ _id: vendor.id });
        const newBin = await wasteBin.save().then((result) => {
            res.json({ message: 'Your request has been processed successfully. The Vendor has been notified  of your request' });
            // sendWhatsAppMessage({
            //     phoneNumber: `+234${VendorDetails?.phoneNumber}`,
            //     message: ""
            // })
            EmailClient({ email: result.vendor.vendorEmail, subject: 'NEW WASTE BIN REQUEST', body: '' });
            sendWhatsAppMessage({
                phoneNumber: phoneNumber,
                message: `Your Waste of ${wasteBags} bag(s) has been successful scheduled for pick up ${new Date(
                    result.pickupDate
                ).toISOString()}. Once accepted by the vendor, they'll be in contact with you.`
            });
        });
    } catch (error) {
        handleError(error, res);
    }
};

export const FetchUserBin = async (req: Request<FetchBinInput>, res: Response<Res>) => {
    let id = req.params['id'];

    try {
        let userBin = await Bin.find({
            ownerId: id
        });

        let user_Bin: any = [];
        // let omittedDataBin
        if (userBin.length > 0) {
            res.send({ message: 'successful', data: userBin });
            // userBin.forEach((item) => (user_Bin = [...user_Bin, itedayjs(item.pickupDate).fromNow()]));

            // res.json(user_Bin);
        } else {
            res.send({ data: [], message: 'No bin found' });
        }
    } catch (error: any) {
        res.status(500).send({ message: 'an error occured', data: null, error: error });
        console.error(error);
    }
};

export const FetchVendorBin = async (req: Request<FetchBinInput>, res: Response<Res>) => {
    let id = req.params['id'];
    const bin: Array<IBinModel> = [];

    try {
        let VendorsBin = await Bin.find({ 'vendor.id': id });

        if (VendorsBin) {
            //     [VendorsBin].forEach(element => {

            //     });
            // VendorsBin?.formatDate = dayjs(pickupDate).fromNow(),

            res.send({ message: 'successful', data: VendorsBin });
        } else {
            res.send({ data: [], message: 'No bin found' });
        }
    } catch (error: any) {
        res.status(500).send({ message: 'an error occured', data: null, error: error });
        console.error(error);
    }
};

export const BinUpdate = async (req: Request, res: Response<Res>) => {
    // console.log(res.locals.user);
    try {
        // Bin ID
        let id = req.params['id'];
        let { status, owner, date, address } = req.body;

        util.types.isDate(date);

        const ownerId = await User.findById({ _id: owner });

        if (status === 'INITIATED') {
            const updatedBin = await Bin.findByIdAndUpdate({ _id: id }, { CompletionStatus: status }, { new: true });

            if (updatedBin && ownerId) {
                EmailClient({
                    email: ownerId.email,
                    subject: `WASTE BIN PICKUP REQUEST ${status}`,
                    body: `YOUR REQUEST HAS BEEN ${status}`
                });
                return res.status(202).send({ message: 'Bin Updated Successfully', data: null });
            }
        } else if (status === 'POSTPONED') {
            const updatedBin = await Bin.findByIdAndUpdate({ _id: id }, { CollectorStatus: status }, { new: true });

            if (updatedBin && ownerId) {
                EmailClient({
                    email: ownerId.email,
                    subject: `WASTE BIN PICKUP REQUEST ${status}`,
                    body: `YOUR REQUEST HAS BEEN ${status} successfully to ${new Date(date).toISOString()} `
                });
                return res.status(202).send({ message: 'Bin Updated Successfully', data: null });
            }
        } else {
            const updatedBin = await Bin.findByIdAndUpdate({ _id: id }, { CollectorStatus: status }, { new: true });

            if (updatedBin && ownerId) {
                EmailClient({
                    email: ownerId.email,
                    subject: `WASTE BIN PICKUP REQUEST ${status}`,
                    body: `YOUR REQUEST HAS BEEN ${status}`
                });
                return res.status(202).send({ message: 'Bin Updated Successfully', data: null });
            }
        }
        // await Bin.findOneAndUpdate({ _id: id }, { CollectorStatus: status }, { new: true }, (err, user) => {
        //     if (user) {
        //         //     console.log('Error:', err);
        //         //     return res.send({ message: 'An Error Occured', data: null, error: err });
        //         // } else {
        //         console.log(user);
        //
        //         return res.send({ message: 'Successful', data: null });
        //     }
        // });
    } catch (error: any) {
        console.log({ error });
        return res.status(400).json({ message: 'something went wrong', data: null, error: error });
    }
};
