import { object, string, TypeOf } from 'zod';

export const LoginUserSchema = object({
    body: object({
        user: string({
            required_error: 'email or phone number is required'
        }),
        // .email('Not a valid email')
        password: string({
            required_error: 'Password is required'
        }).min(8, 'Password should be at least 8 characters')
    })
});

export type LoginUserInput = TypeOf<typeof LoginUserSchema>['body'];

export const createUserSchema = object({
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
        })
            .min(10, 'Minimum of 10 characters')
            .max(11, 'Maximum of 11 characters'),
        address: string().nullish(),
        userType: string({
            required_error: 'user type is required'
        })
    })
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];

export const verifyUserSchema = object({
    params: object({
        id: string(),
        verificationCode: string()
    })
});

export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params'];
