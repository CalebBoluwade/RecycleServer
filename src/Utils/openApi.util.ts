import { Application } from 'express';
import { bearerAuth, OpenApi, OpenApiSchema } from 'ts-openapi';
import swaggerUi from 'swagger-ui-express';
// import { config } from '../Config/config';

// create an OpenApi instance to store definitions
const options: OpenApiSchema = {
    info: {
        contact: {
            email: 'calebb.jnr@gmail.com'
        },
        description: 'REST APIs',
        license: {
            name: 'Apache License, Version 2.0',
            url: 'http://www.apache.org/licenses/LICENSE-2.0'
        },
        termsOfService: '',
        title: 'COMOT YAMA YAMA',
        version: '1.0.0'
    },
    openapi: '3.0.3',
    paths: {},
    servers: [{ url: `http://localhost:${1732}` }, { url: 'https://keysupport.com:443' }]
    // components: {
    //     securitySchemas: {
    //             bearerAuth: {
    //                 type: 'http',
    //                 scheme: 'bearer',
    //                 bearerFormat: 'JWT'
    //             }
    //         },
    // },
    // security: [
    //     {
    //         bearerAuth: []
    //     }
    // ]
};

export const openApiInstance: OpenApi = new OpenApi('3.0.3', 'COMOT YAMA YAMA', 'REST APIs', 'calebb.jnr@gmail.com');
// openApiInstance.

// declare servers for the API
openApiInstance.setServers([{ url: `http://localhost:${1732}/api/v1` }, { url: 'https://keysupport.com:443/api/v1' }]);

// set API license
openApiInstance.setLicense(
    'Apache License, Version 2.0', // API license name
    'http://www.apache.org/licenses/LICENSE-2.0', // API license url
    'http://dummy.io/terms/' // API terms of service
);

export function initOpenApi(app: Application, openApi: OpenApi) {
    // generate our OpenApi schema
    const openApiJson = openApi.generateJson();

    // we'll create an endpoint to reply with openapi schema
    app.get('/openapi.json', function (_req, res) {
        res.setHeader('Cache-Control', 'no-store, must-revalidate');
        res.setHeader('Expires', '0');
        res.json(openApiJson);
    });
    // this will make openapi UI available with our definition
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiJson));
}
