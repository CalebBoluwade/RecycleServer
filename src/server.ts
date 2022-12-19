import dotenv from 'dotenv';
dotenv.config();
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './Config/config';
import bodyParser from 'body-parser';
import https from 'https';
import fs from 'fs';
import path from 'path';

import { ApplicationRouter, Route } from './Routes/Route.Index';
import { OpenApi, textPlain } from 'ts-openapi';
import { openApiInstance } from './openApi';

const router: Application = express();

export default router;

mongoose.set('strictQuery', false);
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        console.log('Mongo Atlas Database Connected');
        startHttpsServer();
    })
    .catch((err) => console.log(err.message));

const startHttpsServer = () => {
    router.use((req, res, next) => {
        console.log(
            `${new Date()} Incomming Method: [${req.method}] - URL: [${req.url}] - Thread: [${process.pid}] IP: [${req.socket.remoteAddress}], Request: [${
                req.method === '[GET]' ? req.params || req.query : req.body
            }]`
        );

        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());
    router.use(bodyParser.json());
    router.use(
        cors({
            // preflightContinue: true,
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'PATCH'],
            credentials: true
        })
    );

    /** Routes */

    /** Healthcheck */
    router.use('/api/v1', Route);

    // router.get('/ping', (req: Request, res: Response, next: NextFunction) => res.status(200).json({ hello: 'world' }));

    const ping = (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json({ hello: 'world' });
    };

    // initHello(router, openApiInstance);

    // initializes schema endpoint and UI
    // initOpenApi(router, openApiInstance);
    ApplicationRouter(router, openApiInstance, ping);

    router.listen(Number(process.env.PORT) || 4321, () => {
        console.log(`Server started on Port ${process.env.PORT || 4321}`);
    });
};
