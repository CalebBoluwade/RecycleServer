import dotenv from 'dotenv';
dotenv.config();
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './Config/config';
import bodyParser from 'body-parser';
import { initializeUnhandledException } from './Utils/ErrorHandler.util';
import https from 'https';
import fs from 'fs';
import path from 'path';

import { App, Route } from './Routes/Route.Index';
import { OpenApi, textPlain } from 'ts-openapi';
import { openApiInstance } from './Utils/openApi.util';

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
        console.log(`${new Date()} ===> [METHOD]: [${req.method}] <-> [ENDPOINT]: [${req.url}] <-> [THREAD]: [${process.pid}] <-> [IP]: [${req.socket.remoteAddress}]`);

        next();
    });

    initializeUnhandledException();

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
    router.use('/api/v1', Route);

    App(router);

    router.listen(Number(process.env.PORT) || 4321, () => {
        console.log(`Server started on Port ${process.env.PORT || 4321}`);

        const connection = mongoose.connection;

        connection.on('reconnected', () => {
            console.log('Mongo Connection Reestablished');
        });
        connection.on('disconnected', () => {
            console.log('Mongo Connection Disconnected');
            console.log('Trying to reconnect to Mongo ...');
            setTimeout(() => {
                mongoose
                    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
                    .then(() => {
                        console.log('Mongo Atlas Database Connected');
                        startHttpsServer();
                    })
                    .catch((err) => console.log(err.message));
            }, 3000);
        });
        connection.on('close', () => {
            console.log('Mongo Connection Closed');
        });
        connection.on('error', (error: Error) => {
            console.log('Mongo Connection ERROR: ' + error);
        });
    });
};
