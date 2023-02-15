import { Router } from 'express';

import { OpenApi, textPlain, Types } from 'ts-openapi';
// import { userTypeSet } from '../../Utils/Types.utils';
import { BinService } from './Bin.service';
import { BinSchema } from './bin.schema';
import ValidateRequest from '../../Middlewares/Validate.middleware';

export const BinRoutes = (Route: Router, openApi: OpenApi) => {
    Route.post('/dispose/bin', ValidateRequest(BinSchema), BinService);
    openApi.addPath(
        '/dispose/bin',
        {
            post: {
                description: 'Disposal', // Method description
                summary: 'Disposal Requirements', // Method summary
                operationId: 'dispose', // an unique operation id
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
                            address: Types.String({
                                description: "User's Full Name",
                                maxLength: 50,
                                required: true
                            }),
                            email: Types.Email({
                                description: "User's Email",
                                maxLength: 50,
                                required: true
                            })
                            // userType: Types.StringEnum({
                            //     value: userTypeSet,
                            //     description: 'Customer Type',
                            //     required: false
                            // })
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
