import mongoose, { Document, Schema } from 'mongoose';
import { CollectorStatus, CompletionStatus } from '../../Utils/Types.utils';

export interface IBin {
    email: string;
    address: string;
    wasteBags: number;
    wasteMaterials: string[];
    phoneNumber: string;
    imageDescription?: string | null;
    pickupDate: number;
    vendor: {
        id: Schema.Types.ObjectId | string;
        vendor: string;
        vendorTel: string;
        vendorEmail: string;
    };
    CollectorStatus: CollectorStatus;
    CompletionStatus: CompletionStatus;
}

export interface IBinModel extends IBin, Document {
    timestamps: true;
    versionKey: true;
}

const BinSchema: Schema = new Schema({
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    wasteBags: {
        type: Number,
        required: true
    },
    wasteMaterials: {
        type: Array,
        required: true
    },
    imageDescription: {
        type: String,
        required: false
    },
    pickupDate: {
        type: Number,
        required: true
    },
    vendor: { type: Object, required: true, ref: 'Vendor' },
    CollectorStatus: {
        type: String,
        required: true
    },
    CompletionStatus: {
        type: String,
        required: true
    }
});

export default mongoose.model<IBinModel>('Bin', BinSchema);
