import { ErrorRequestHandler, Request, Response } from 'express';
import Vendor from './Vendor.model';
import lodash from 'lodash';
import { CollectorStatus, customerStatus } from '../../Utils/Types.utils';
import { Res } from '../../Schema/Response.schema';
import Bin from '../Bin/Bin.model';

export const ActivateVendor = async (req: Request, res: Response) => {
    let id = req.query.id;

    const update = req.body;

    await Vendor.findOneAndUpdate({ id: id, update });
};

export const GetAvailableVendors = async (_: Request, res: Response) => {
    try {
        let availaleVendors = await Vendor.find({ vendorStatus: customerStatus['ACTIVE'] }).lean();

        let Vendors: any = [];
        if (availaleVendors.length > 0) {
            availaleVendors.forEach((vendor) => (Vendors = [...Vendors, lodash.omit(vendor, ['password', '__v'])]));
        }
        res.jsonp(Vendors);
    } catch (error) {
        console.log(error);
    }
};
