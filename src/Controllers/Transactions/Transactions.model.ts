import mongoose, { Document, Schema, Types } from 'mongoose';
import bcrypt from 'bcrypt';
import { userTypeSet } from '../../Utils/Types.utils';

export enum TranactionType {
    'CREDIT' = 'CREDIT',
    'DEBIT' = 'DEBIT'
}

export enum TranactionStatus {
    'SUCCESSFUL' = 'SUCCESSFUL',
    'FAILED' = 'FAILED',
    'PENDING' = 'PENDING'
}

export interface ITransaction {
    amount: number;
    email: string;
    description: string;
    status: TranactionStatus;
    type: TranactionType;
    userType: userTypeSet;
    transDate: string;
    CRacctName: string;
    CRacctNo: string;
}

export interface ITransactionModel extends ITransaction, Document {}

const TransactionSchema: Schema = new Schema({
    email: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: TranactionStatus,
        required: true
    },
    type: {
        type: TranactionType,
        required: true
    },
    userType: {
        type: userTypeSet,
        required: true
    },
    transDate: {
        type: String,
        required: true
    },
    CRacctNo: {
        type: String,
        required: true
    },
    CRacctName: {
        type: String,
        required: true
    }
});

export default mongoose.model<ITransactionModel>('transaction', TransactionSchema);
