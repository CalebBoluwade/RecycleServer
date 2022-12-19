import mongoose, { Document, Schema } from 'mongoose';

interface IUser {
    fullName: string;
    email: string;
    password: string;
    userType: string;
}

export interface IUserModel extends IUser, Document {}

const userSchema: Schema = new Schema({
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
    userType: {
        type: String,
        required: true
    }
});

export default mongoose.model<IUserModel>('User', userSchema);
