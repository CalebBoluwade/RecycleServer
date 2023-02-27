import { Router } from 'express';
import letUsersLogin from './Login.authService';
import UserCreation, { VerifyUser } from './Register.authService';
import { LoginUserSchema, createUserSchema, verifyUserSchema } from './auth.schema';
import ValidateRequest from '../../Middlewares/Validate.middleware';

import { OpenApi, textPlain, Types } from 'ts-openapi';
import { UserSet } from '../../Utils/Types.utils';

export const LoginRoute = (Route: Router, openApi: OpenApi) => {
    Route.post('/users/continue', ValidateRequest(LoginUserSchema), letUsersLogin);
    openApi.addPath(
        '/users/continue',
        {
            post: {
                description: 'User Authentication', // Method description
                summary: 'User Authentication API', // Method summary
                operationId: 'login', // an unique operation id
                requestSchema: {
                    headers: {
                        //     Authorization: Types.Object({
                        //         description: "User's Authorization",
                        //         required: true
                        // })
                    },
                    body: Types.Object({
                        required: true,
                        description: 'Authentication using email and password',
                        properties: {
                            email: Types.String({
                                description: "User's Email",
                                maxLength: 50,
                                required: true
                            }),
                            password: Types.String({
                                description: "User's Password",
                                maxLength: 25,
                                required: true,
                                minLength: 8
                            })
                        },
                        default: {
                            email: 'dad',
                            password: 'mom'
                        },
                        example: {
                            email: 'dad2',
                            password: 'mom'
                        }
                    })
                },
                responses: {
                    // here we declare the response types
                    200: textPlain('Successful Operation'),
                    500: textPlain('Internal Server Error')
                },
                tags: ['Auth'], // these tags group your methods in UI,
                security: []
            }
        },
        true // make method visible
    );
};

export const RegisterRoute = (Route: Router, openApi: OpenApi) => {
    Route.post('/users/join', ValidateRequest(createUserSchema), UserCreation);
    openApi.addPath(
        '/users/join',
        {
            post: {
                description: 'User Registration', // Method description
                summary: 'User Registration API', // Method summary
                operationId: 'register', // an unique operation id
                requestSchema: {
                    headers: {
                        // Authorization: Types.Object({
                        //     description: "User's Authorization",
                        //     required: true
                        // })
                    },
                    body: Types.Object({
                        required: true,
                        description: 'Authentication using email and password',
                        properties: {
                            fullName: Types.String({
                                description: "User's Full Name",
                                maxLength: 50,
                                required: true
                            }),
                            email: Types.Email({
                                description: "User's Email",
                                maxLength: 50,
                                required: true
                            }),
                            password: Types.Password({
                                description: "User's Password",
                                maxLength: 25,
                                required: true,
                                minLength: 8
                            }),
                            userType: Types.StringEnum({
                                values: Object.values(UserSet),
                                description: 'Customer Type',
                                required: true
                            })
                        },
                        default: {
                            email: 'dad',
                            password: 'mom',
                            userType: UserSet.USER
                        }
                    })
                },
                responses: {
                    // here we declare the response types
                    201: textPlain('Created'),
                    // 201: {
                    //     content: {
                    //         description: "Created",
                    //         properties: {
                    //             name: ""
                    //         },
                    //         default: {
                    //             // id: 'b710e129-4e2c-4448-b605-73b18d297bae',
                    //             name: 'Customer Name',
                    //             type: CustomerType.Platinum,
                    //             birthdate: '2020-12-30'
                    //         }
                    //     }
                    //     //   Types.Object({

                    //         // })
                    // },
                    // 400: content: Types.Object({})
                    500: textPlain('Internal Server Error')
                },
                tags: ['Auth'], // these tags group your methods in UI,
                security: []
            }
        },
        true // make method visible
    );
};

export const verifyRoute = (Route: Router, openApi: OpenApi) => {
    Route.post('/users/verify/:id/:verificationCode', ValidateRequest(verifyUserSchema), VerifyUser);
    openApi.addPath(
        '/users/verify/:id/:verificationCode',
        {
            get: {
                description: 'User Verification', // Method description
                summary: 'User Verification API', // Method summary
                operationId: 'user-verify', // an unique operation id
                requestSchema: {
                    headers: {},
                    params: {
                        id: Types.String({
                            description: "User's Full Name",
                            maxLength: 50,
                            required: true
                        }),
                        verificationCode: Types.String({
                            description: "User's Verification Code",
                            maxLength: 6,
                            required: true
                        })
                    }
                },
                responses: {
                    201: textPlain('Created'),
                    400: textPlain('Bad Request'),
                    500: textPlain('Internal Server Error')
                },
                tags: ['Auth'], // these tags group your methods in UI,
                security: []
            }
        },
        true // make method visible
    );
};
