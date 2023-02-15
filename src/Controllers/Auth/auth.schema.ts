import { object, string, TypeOf } from 'zod';

const LoginPayload = {
    body: object({
        email: string({
            required_error: 'email is required'
        }).email('Not a valid email'),
        password: string({
            required_error: 'Password is required'
        }).min(8, 'Password should be at least 8 characters')
    })
};

export const LoginUserSchema = object({
    ...LoginPayload
});
export type LoginSchema = TypeOf<typeof LoginUserSchema>;

const createUserSchema = {
    body: object({
        fullName: string({
            required_error: 'Name is required'
        }),
        password: string({
            required_error: 'Name is required'
        }).min(6, 'Password too short - should be 6 chars minimum'),
        email: string({
            required_error: 'Email is required'
        }).email('Not a valid email'),
        phoneNumber: string({
            required_error: 'Phone number is required'
        }),
        address: string().optional().nullish(),
        userType: string({
            required_error: 'user type is required'
        })
    })
};

export const newUserSchema = object({
    ...createUserSchema
});
export type createUserSchema = TypeOf<typeof newUserSchema>;
