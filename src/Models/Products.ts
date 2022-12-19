import mongoose, { Document, Schema } from 'mongoose';

interface IProduct {
    name: string;
    value: string;
}

export interface IProductModel extends IProduct, Document {}

const ProductSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        owner: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        value: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: true
    }
);

export default mongoose.model<IProductModel>('Product', ProductSchema);
