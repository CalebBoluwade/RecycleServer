import mongoose, { Document, Schema } from 'mongoose';
import argo2 from 'argon2';

export enum customerStatus {
    'ACTIVE' = 'ACTIVE',
    'PENDING' = 'PENDING',
    'DISABLED' = 'DISABLED',
    'DELETED' = 'DELETED'
}

export interface IUser {
    fullName: string;
    email: string;
    password: string;
    userType: string;
    address: string;
    refCode: string;
    refCodeCount: number;
    phoneNumber: string;
    status: customerStatus;
}

export interface IUserModel extends IUser, Document {}

const userSchema: Schema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    refCode: {
        type: String,
        required: false
    },
    refCodeCount: {
        required: false,
        type: Number
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async () => {
    // const hash = await argo2.hash(password)
});

// const x = () => {}

// userSchema.methods.x

export default mongoose.model<IUserModel>('User', userSchema);
