import { object, number, string, TypeOf, date, boolean } from 'zod';

const Bin = {
    body: object({
        email: string({
            required_error: 'email is required'
        }).email('Not a valid email'),
        address: string({
            required_error: 'Address not provided'
        }),
        wasteBags: number({
            required_error: 'Mininmum of 1 Bag'
        }),
        imageDescription: string({}),
        pickupDate: date({
            required_error: 'Date not provided'
        }),
        vendorID: string({
            required_error: 'Vendor is required'
        }),
        status: boolean({}).nullable()
    })
};

export const BinSchema = object({
    ...Bin
});

export type BinDataSchema = TypeOf<typeof BinSchema>['body'];
