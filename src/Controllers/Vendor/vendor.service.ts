import { ErrorRequestHandler, Request, Response } from 'express';
import Vendor from './Vendor.model';
import lodash from 'lodash';
import { customerStatus } from '../../Utils/Types.utils';

export const ActivateVendor = async (req: Request, res: Response) => {
    let id = req.query.id;

    const update = req.body;

    await Vendor.findOneAndUpdate({ id: id, update });
};

export const GetAvailableVendors = async (req: Request, res: Response) => {
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

export const GetPendingVendorRequests = async (req: Request, res: Response) => {
    try {
        let availaleVendors = await Vendor.find({ vendorStatus: customerStatus['ACTIVE'] });

        res.send({ data: lodash.omit(availaleVendors, 'password') });
    } catch (error) {
        console.log(error);
    }
};
