import express, { Application, Request, Response, NextFunction, application } from 'express';
import { letUsersLogin, UserCreation } from '../Controllers/index';
import { initOpenApi, openApiInstance } from '../openApi';
import { OpenApi, textPlain } from 'ts-openapi';

const Route = express.Router();

Route.post('/login', letUsersLogin);
Route.post('/join', UserCreation);

const ping = (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ hello: 'world' });
};

const ApplicationRouter = (Application: Application, openApi: OpenApi, Controller: any) => {
    function initHello() {
        Application.get('/ping', ping);
        // declare our API
        openApi.addPath(
            '/ping', // this is API path
            {
                // API method
                get: {
                    description: 'Hello world', // Method description
                    summary: 'Demo get request to show how to declare APIs', // Method summary
                    operationId: 'get-hello-op', // an unique operation id
                    responses: {
                        // here we declare the response types
                        200: textPlain('Successful Operation')
                    },
                    tags: ['Health Check'] // these tags group your methods in UI
                }
            },
            true // make method visible
        );
    }

    const LoginRoute = () => {
        Route.get('/api/v1/login', letUsersLogin);
        // declare our API
        openApi.addPath(
            '/api/v1/login', // this is API path
            {
                // API method
                post: {
                    description: 'Login', // Method description
                    summary: 'User Login Authentication API', // Method summary
                    operationId: 'auth_login', // an unique operation id
                    responses: {
                        // here we declare the response types
                        200: textPlain('Successful Operation')
                    },
                    tags: ['Auth'] // these tags group your methods in UI
                }
            },
            true // make method visible
        );
    };

    // initializes schema endpoint and UI
    LoginRoute();
    initHello();
    initOpenApi(Application, openApiInstance);
};

//  // declare our hello world api
export { ApplicationRouter, Route };
