import { Router } from 'express';

import { OpenApi, textPlain, Types } from 'ts-openapi';
// import { userTypeSet } from '../../Utils/Types.utils';
import { BinUpdate, CreateNewBin, FetchOtherWasteMaterials, FetchUserBin, FetchVendorBin } from './Bin.service';
import { BinSchema, FetchBinSchema } from './bin.schema';
import ValidateRequest from '../../Middlewares/Validate.middleware';
import SessionController from '../../Middlewares/Session.middleware';

const CreateBinRoute = (Route: Router, openApi: OpenApi) => {
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

const FetchBinMaterialsRoute = (Route: Router, openApi: OpenApi) => {
    Route.get('/list/bin/items', SessionController(), FetchOtherWasteMaterials);
    openApi.addPath(
        '/list/bin/items',
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

const FetchUserBinRoute = (Route: Router, openApi: OpenApi) => {
    Route.get('/dispose/list/user/:id', ValidateRequest(FetchBinSchema), FetchUserBin);
    openApi.addPath(
        '/dispose/list/user/:id',
        {
            get: {
                description: 'Disposal', // Method description
                summary: "User's Waste Bin", // Method summary
                operationId: 'dispose-user-list', // an unique operation id
                requestSchema: {
                    headers: {},
                    params: {
                        id: Types.String({
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

const FetchVendorBinRoute = (Route: Router, openApi: OpenApi) => {
    Route.get('/dispose/list/vendor/:id', ValidateRequest(FetchBinSchema), FetchVendorBin);
    openApi.addPath(
        '/dispose/list/vendor/:id',
        {
            get: {
                description: 'Disposal', // Method description
                summary: "Vendors's Waste Bin", // Method summary
                operationId: 'dispose-vendor-list', // an unique operation id
                requestSchema: {
                    headers: {},
                    params: {
                        id: Types.String({
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

const BinActions = (Route: Router, openApi: OpenApi) => {
    Route.patch('/update/bin/:id', SessionController(), BinUpdate);
    openApi.addPath(
        '/update/bin/:id',
        {
            get: {
                description: 'Update Vendor Bin API',
                summary: 'Vendor Registration',
                operationId: 'vendor-update',
                requestSchema: {
                    headers: {},
                    params: {
                        id: Types.String({
                            required: true
                        })
                    }
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

const Bin = (Route: Router, openApi: OpenApi) => {
    CreateBinRoute(Route, openApi);
    FetchBinMaterialsRoute(Route, openApi);
    FetchUserBinRoute(Route, openApi);
    FetchVendorBinRoute(Route, openApi);
    BinActions(Route, openApi);
};

export default Bin;
