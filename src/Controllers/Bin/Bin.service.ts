import { Request, Response } from 'express';
import Bin, { IBin } from './Bin.model';
import { BinDataSchema, FetchBinInput, VendorFetchBinInput } from './bin.schema';
import { handleError } from '../../Utils/ErrorHandler.util';
import mongoose from 'mongoose';
import { CollectorStatus, CompletionStatus, wasteBinData } from '../../Utils/Types.utils';
import Vendor from '../Vendors/Vendor.model';
import lodash from 'lodash';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import sendSMSMessage from '../../Integrations/Messages/TwilloSMS.service';
import sendWhatsAppMessage from '../../Integrations/Messages/TwilioWhatsApp.service';

dayjs.extend(relativeTime);
// export const BinService = async (req: Request<{}, {}, BinDataSchema>, res: Response<any>) => {
// try {
//     } catch (error) {
//         handleError(error, res);
//     }
// };

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
            //     // sendSMSMessage({
            //     //     phoneNumber: `+234${'8038220361'}`,
            //     //     message: `Dear User, Your Waste of ${wasteBags} bag(s) has been successful scheduled for pick up ${
            //     //         pickupDate === new Date() ? 'today' : pickupDate
            //     //     }. Once accepted by the vendor, they'll be in contact with you.`
            //     // });
        });
    } catch (error) {
        handleError(error, res);
    }
};

export const FetchOtherWasteMaterials = (_: Request, res: Response<any>) => {
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

    res.send(dataSet);
};

export const FetchUserBin = async (req: Request<FetchBinInput>, res: Response<any>) => {
    let id = req.params['id'];

    try {
        let userBin = await Bin.find({
            ownerId: id
        });

        let user_Bin: any = [];
        // let omittedDataBin
        if (userBin.length > 0) {
            userBin.forEach(
                (item, index) =>
                    (user_Bin = [
                        // ...user_Bin,
                        (item.formatDate = dayjs(item.pickupDate).format('YYYY-MM-DD')),
                        lodash.omit(item, ['_id', 'address', '__v', 'phoneNumber', 'vendor.id', 'vendor.vendor'])
                    ])
            );
        }
        res.json(user_Bin);
    } catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
};

export const FetchVendorBin = async (req: Request<VendorFetchBinInput>, res: Response<any>) => {
    let { email, phoneNumber } = req.query;
    try {
        let vendorBin = await Bin.find({
            $or: [{ 'vendor.vendorEmail': email }, { 'vendor.vendorTel': `+234${phoneNumber}` }]
        });

        if (vendorBin) {
            res.send(vendorBin);
        }
    } catch (error) {
        res.status(500).send(error);
        console.error(error);
    }
};
