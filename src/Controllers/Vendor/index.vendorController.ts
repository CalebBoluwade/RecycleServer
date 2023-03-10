import { OpenApi, textPlain, Types } from 'ts-openapi';
import { Router } from 'express';
import { createVendorSchema } from './vendor.schema';
import letVendorsLogin from './VendorLogin.authService';
import ValidateRequest from '../../Middlewares/Validate.middleware';
import VendorCreation from './RegisterVendor.authService';
import { GetAvailableVendors } from './vendor.service';
import { LoginUserSchema } from '../Auth/auth.schema';

export const VendorsRegisterRoute = (Route: Router, openApi: OpenApi) => {
    Route.post('/vendor/join', ValidateRequest(createVendorSchema), VendorCreation);
    openApi.addPath(
        '/vendor/join',
        {
            post: {
                description: 'Vendor Registration API Endpoint',
                summary: 'Vendor Registration',
                operationId: 'register-vendor',
                requestSchema: {
                    headers: {},
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
                            })
                        }
                    })
                },
                responses: {
                    // here we declare the response types
                    201: textPlain('Created'),

                    500: textPlain('Internal Server Error')
                },
                tags: ['Vendor'], // these tags group your methods in UI,
                security: []
            }
        },
        true // make method visible
    );
};

export const VendorsLoginRoute = (Route: Router, openApi: OpenApi) => {
    Route.post('/vendor/continue', ValidateRequest(LoginUserSchema), letVendorsLogin);
    openApi.addPath(
        '/vendor/continue',
        {
            post: {
                description: 'Vendor Authentication', // Method description
                summary: 'Vendor Authentication API', // Method summary
                operationId: 'vlogin', // an unique operation id
                requestSchema: {
                    headers: {
                        //     Authorization: Types.Object({
                        //         description: "Vendor's Authorization",
                        //         required: true
                        // })
                    },
                    body: Types.Object({
                        required: true,
                        description: 'Authentication using email and password',
                        properties: {
                            email: Types.String({
                                description: "Vendor's Email",
                                maxLength: 50,
                                required: true
                            }),
                            password: Types.String({
                                description: "Vendor's Password",
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

export const GetVendorsRoute = (Route: Router, openApi: OpenApi) => {
    Route.get('/vendor/find', GetAvailableVendors);
    openApi.addPath(
        '/vendor/find',
        {
            get: {
                description: 'Vendor Registration API Endpoint',
                summary: 'Vendor Registration',
                operationId: 'get-vendor',
                requestSchema: {
                    headers: {},
                    query: {}
                },
                responses: {
                    // here we declare the response types
                    200: textPlain('Successful'),
                    500: textPlain('Internal Server Error')
                },
                tags: ['Vendor'], // these tags group your methods in UI,
                security: []
            }
        },
        true // make method visible
    );
};
