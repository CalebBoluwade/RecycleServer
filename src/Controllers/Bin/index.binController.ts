import { Router } from 'express';

import { OpenApi, textPlain, Types } from 'ts-openapi';
// import { userTypeSet } from '../../Utils/Types.utils';
import { CreateNewBin, FetchOtherWasteMaterials, FetchUserBin, FetchVendorBin } from './Bin.service';
import { BinSchema, FetchBinSchema, VendorFetchBinSchema } from './bin.schema';
import ValidateRequest from '../../Middlewares/Validate.middleware';
import SessionController from '../../Middlewares/Session.middleware';

export const CreateBinRoute = (Route: Router, openApi: OpenApi) => {
    Route.post('/dispose/wastebin', ValidateRequest(BinSchema), CreateNewBin);
    openApi.addPath(
        '/dispose/wastebin',
        {
            post: {
                description: 'Disposal', // Method description
                summary: 'Disposal Requirements', // Method summary
                operationId: 'dispose', // an unique operation id
                requestSchema: {
                    headers: {},
                    body: Types.Object({
                        required: true,
                        description: 'Data required to make a disposal request',
                        properties: {
                            address: Types.String({
                                description: "User's Address",
                                maxLength: 50,
                                required: true
                            }),
                            email: Types.Email({
                                description: "customer's email",
                                maxLength: 50,
                                required: true
                            }),
                            phoneNumber: Types.String({
                                description: "customer's phone number",
                                maxLength: 50,
                                required: true
                            })
                        }
                    })
                },
                responses: {
                    200: textPlain('Successful'),
                    // 400: content: Types.Object({})
                    500: textPlain('Internal Server Error')
                },
                tags: ['Waste Bin'], // these tags group your methods in UI,
                security: []
            }
        },
        true // make method visible
    );
};

export const FetchBinMaterialsRoute = (Route: Router, openApi: OpenApi) => {
    Route.get('/dispose/materials', SessionController(), FetchOtherWasteMaterials);
    openApi.addPath(
        '/dispose/materials',
        {
            get: {
                description: 'Disposal', // Method description
                summary: 'Disposal Requirements', // Method summary
                operationId: 'dispose-materials', // an unique operation id
                requestSchema: {
                    headers: {}
                },
                responses: {
                    200: textPlain('Created'),
                    // 400: content: Types.Object({})
                    500: textPlain('Internal Server Error')
                },
                tags: ['Waste Bin'], // these tags group your methods in UI,
                security: []
            }
        },
        true // make method visible
    );
};

export const FetchUserBinRoute = (Route: Router, openApi: OpenApi) => {
    Route.get('/dispose/user/list/:email', ValidateRequest(FetchBinSchema), FetchUserBin);
    openApi.addPath(
        '/dispose/user/list/:email',
        {
            get: {
                description: 'Disposal', // Method description
                summary: "User's Waste Bin", // Method summary
                operationId: 'dispose-user-list', // an unique operation id
                requestSchema: {
                    headers: {},
                    params: {
                        email: Types.Email({
                            required: true
                        })
                    }
                },
                responses: {
                    200: textPlain('Sucessful'),
                    // 400: content: Types.Object({})
                    500: textPlain('Internal Server Error')
                },
                tags: ['Waste Bin'], // these tags group your methods in UI,
                security: []
            }
        },
        true // make method visible
    );
};

export const FetchVendorBinRoute = (Route: Router, openApi: OpenApi) => {
    Route.get('/dispose/vendor/list', ValidateRequest(VendorFetchBinSchema), FetchVendorBin);
    openApi.addPath(
        '/dispose/vendor/list',
        {
            get: {
                description: 'Disposal', // Method description
                summary: "Vendors's Waste Bin", // Method summary
                operationId: 'dispose-vendor-list', // an unique operation id
                requestSchema: {
                    headers: {},
                    query: {
                        email: Types.Email({
                            required: false
                        }),
                        phoneNumber: Types.Email({
                            required: false
                        })
                    }
                },
                responses: {
                    200: textPlain('Sucessful'),
                    // 400: content: Types.Object({})
                    500: textPlain('Internal Server Error')
                },
                tags: ['Waste Bin'], // these tags group your methods in UI,
                security: []
            }
        },
        true // make method visible
    );
};
