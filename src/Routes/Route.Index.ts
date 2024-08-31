import express, { Application, Request, Response, NextFunction } from 'express';
import Users from '../Controllers/Auth/index.authRoutes';
import Bin from '../Controllers/Bin/index.binRoutes';

// ** VENDOR ** //
import Vendor from '../Controllers/Vendor/index.vendorRoutes';

import { GenerateQR } from '../Controllers/index';
import { GenerateReferalCode, ValidateRefCode as ValidateRef } from '../Utils/index.util';
import { initOpenApi, openApiInstance } from '../Utils/openApi.util';
import { OpenApi, textPlain, Types } from 'ts-openapi';
import { TestMessagingService } from '../Integrations/Messages/TestMessagingservice';
import TestEmail from '../Integrations/Mails/sendgrid.service';
import TestEmail2 from '../Integrations/Mails/mail.service';

const Route = express.Router();

/** Healthcheck */
const PingPong = (_: Request, Response: Response) => {
    Response.status(200).json({ hello: 'world', discount: 10, showDisount: true });
};

const App = (Application: Application) => {
    const ApplicationRouter = (Application: Application, openApi: OpenApi) => {
        Route.get('/', PingPong);

        const initHello = () => {
            Route.get('/ping', PingPong);
            openApi.addPath(
                '/ping', // this is API path
                {
                    // API method
                    get: {
                        description: 'Hello world', // Method description
                        summary: 'Demo get request to show how to declare APIs', // Method summary
                        operationId: 'get-hello-world', // an unique operation id
                        responses: {
                            // here we declare the response types
                            200: textPlain('Successful Operation')
                        },
                        tags: ['Health Check'] // these tags group your methods in UI
                    }
                },
                true // make method visible
            );
        };

        const GenerateQRcode = () => {
            Route.get('/generate/qrcode', GenerateQR);
            openApi.addPath(
                '/generate/qrcode', // this is API path
                {
                    get: {
                        description: 'Generate Vendor QR Code',
                        summary: 'GET QR Code',
                        operationId: 'generate_qr',
                        requestSchema: {
                            query: {
                                email: Types.Email({
                                    description: 'Email',
                                    maxLength: 50,
                                    required: true
                                })
                            }
                        },
                        responses: {
                            200: textPlain('Successful Operation'),
                            500: textPlain('Internal Server Error')
                        },
                        tags: ['QR Code']
                    }
                },
                true
            );
        };

        const ValidateQRcode = () => {
            Route.get('/validate/qrcode', GenerateQR);
            openApi.addPath(
                '/validate/qrcode', // this is API path
                {
                    get: {
                        description: 'Validate Vendor QR Code',
                        summary: 'Validate QR Code',
                        operationId: 'validateqr',
                        responses: {
                            200: textPlain('Successful Operation'),
                            500: textPlain('Internal Server Error')
                        },
                        tags: ['QR Code']
                    }
                },
                true
            );
        };

        const _GenerateRefCode = () => {
            Route.post('/generate/referral', GenerateReferalCode);
            openApi.addPath(
                '/generate/referral', // this is API path
                {
                    post: {
                        description: 'Referral Code',
                        summary: 'Generate Referral Code',
                        operationId: 'genrefcode',
                        responses: {
                            200: textPlain('Successful Operation'),
                            400: textPlain('Bad Request'),
                            500: textPlain('Internal Server Error')
                        },
                        tags: ['Referral']
                    }
                },
                true
            );
        };

        const ValidateRefCode = () => {
            Route.post('/validate/referral', ValidateRef);
            openApi.addPath(
                '/validate/referral', // this is API path
                {
                    post: {
                        description: 'Validate Referral Code',
                        summary: 'Validate Referral Code',
                        operationId: 'validateRef',
                        responses: {
                            200: textPlain('Successful Operation'),
                            400: textPlain('Bad Request'),
                            500: textPlain('Internal Server Error')
                        },
                        tags: ['Referral']
                    }
                },
                true
            );
        };

        // Users
        Users(Route, openApi);
        // VENDORS
        Vendor(Route, openApi);
        // WASTE BIN
        Bin(Route, openApi);

        Route.get('/test_messaging', TestMessagingService);

        Route.get('/test_email', () => TestEmail2({ email: 'gr00vywavysavage@gmail.com', subject: 'Testing', body: 'bvuj' }));

        // initializes schema endpoint and UI
        GenerateQRcode();
        ValidateQRcode();
        _GenerateRefCode();
        ValidateRefCode();
        initHello();
        initOpenApi(Application, openApiInstance);
    };

    ApplicationRouter(Application, openApiInstance);
};
//  // declare our hello world api
export { App, Route };
