import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface ITransaction {
    customerName: String;
    accountNo: String;
    secretKey: String;
    value: Number;
    email: String;
}

export interface ITransactionModel extends ITransaction, Document {}

const TransactionSchema: Schema = new Schema({
    customerName: {
        type: String,
        required: true
    },
    accountNo: {
        type: String,
        required: true
    },
    secretKey: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

export default mongoose.model<ITransactionModel>('transaction', TransactionSchema);
