import mongoose, { Document, Schema } from 'mongoose';
import { customerStatus } from '../../Utils/Types.utils';
import argo2 from 'argon2';

export interface IVendor {
    companyName: string;
    email: string;
    password: string;
    userType: string;
    address: string;
    phoneNumber: string;
    vendorStatus: customerStatus;
}

export interface IVendorModel extends IVendor, Document {
    createdAt: Date;
    updatedAt: Date;
    validatePassword(inputPassword: string): Promise<Boolean>;
}

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

vendorSchema.methods.validatePassword = async function (inputPassword: string): Promise<boolean> {
    const user = this as IVendorModel;

    return await argo2.verify(user.password, inputPassword).catch((e) => {
        console.log(e);
        return false;
    });
};

export default mongoose.model<IVendorModel>('Vendor', vendorSchema);
