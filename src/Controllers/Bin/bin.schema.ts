import { object, number, string, TypeOf, array } from 'zod';

export const BinSchema = object({
    body: object({
        ownerId: string({
            required_error: 'ownerId is required'
        }),
        address: object({
            description: string().optional(),
            latitude: number({
                required_error: 'Address not provided'
            }),
            longitude: number()
        }),
        phoneNumber: string({
            required_error: 'phone number not provided'
        }),
        wasteBags: number({
            required_error: 'mininmum of 1 Bag'
        }).min(1, 'mininmum of 1 Bag'),
        wasteMaterials: array(string()),
        imageDescription: string().nullable().optional(),
        pickupDate: number({
            required_error: 'Date not provided'
        }),
        vendor: object({
            id: string({
                required_error: 'Select a vendor'
            }).min(24, 'A Vendor is required'),
            vendor: string(),
            vendorTel: string(),
            vendorEmail: string()
        })
    })
});

export type BinDataSchema = TypeOf<typeof BinSchema>['body'];

export const FetchBinSchema = object({
    params: object({
        id: string()
    })
});
export type FetchBinInput = TypeOf<typeof FetchBinSchema>['params'];

export const VendorFetchBinSchema = object({
    params: object({
        id: string()
    })
});

export type VendorFetchBinInput = TypeOf<typeof VendorFetchBinSchema>['params'];
