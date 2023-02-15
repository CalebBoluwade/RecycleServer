import { number } from 'joi';
import mongoose, { Document, Schema } from 'mongoose';

export enum customerStatus {
    'ACTIVE' = 'ACTIVE',
    'PENDING' = 'PENDING',
    'DISABLED' = 'DISABLED',
    'DELETED' = 'DELETED'
}

export interface IVendor {
    fullName: string;
    email: string;
    password: string;
    userType: string;
    address: string;
    phoneNumber: string;
    vendorStatus: customerStatus;
}

export interface IVendorModel extends IVendor, Document {}

const vendorSchema: Schema = new Schema({
    fullName: {
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
