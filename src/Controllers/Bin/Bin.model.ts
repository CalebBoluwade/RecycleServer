import mongoose, { Document, Schema } from 'mongoose';

export interface IBin {
    email: string;
    address: string;
    wasteBags: number;
    imageDescription: string;
    pickupDate: Date;
    vendorID: Schema.Types.ObjectId | string;
    status: boolean | null;
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
    wasteBags: {
        type: Number,
        required: true
    },
    imageDescription: {
        type: String,
        required: false
    },
    pickupDate: {
        type: Date,
        required: true
    },
    vendorID: { type: Schema.Types.ObjectId, required: true, ref: 'Vendor' },
    status: {
        type: Boolean,
        required: true
    }
});

export default mongoose.model<IBinModel>('Bin', BinSchema);
