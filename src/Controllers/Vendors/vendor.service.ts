import { ErrorRequestHandler, Request, Response } from 'express';
import mongoose from 'mongoose';
// import VendorModel from './Vendor.model';
import Vendor, { customerStatus } from './Vendor.model';

const ActivateVendor = async (req: Request, res: Response) => {
    let { email }: { email: string } = req.query;

    const update = req.body;

    await Vendor.findOneAndUpdate({ email: email.toLowerCase(), update });
};

export const GetAvailableVendors = async (req: Request, res: Response) => {};
