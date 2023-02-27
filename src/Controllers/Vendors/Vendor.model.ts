import mongoose, { Document, Schema } from 'mongoose';
import { customerStatus } from '../../Utils/Types.utils';

export interface IVendor {
    companyName: string;
    email: string;
    password: string;
    userType: string;
    address: string;
    phoneNumber: string;
    vendorStatus: customerStatus;
}

export interface IVendorModel extends IVendor, Document {}

const vendorSchema: Schema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    vendorStatus: {
        type: String,
        required: true
    }
});

export default mongoose.model<IVendorModel>('Vendor', vendorSchema);
