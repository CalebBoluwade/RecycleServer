import { object, number, string, TypeOf, date, boolean } from 'zod';

export const createVendorSchema = object({
    body: object({
        companyName: string({
            required_error: 'Name is required'
        }),
        password: string({
            required_error: 'Name is required'
        }).min(6, 'Password too short - should be 6 chars minimum'),
        email: string({
            required_error: 'Email is required'
        }).email('Enter a valid email'),
        phoneNumber: string({
            required_error: 'Phone number is required'
        })
            .min(10, 'Minimum of 10 characters')
            .max(11, 'Maximum of 11 characters'),
        address: string({
            required_error: 'Address is required'
        }).min(15, 'Enter an address of minimum 15 characters')
    })
});

export type CreateVendorInput = TypeOf<typeof createVendorSchema>['body'];
