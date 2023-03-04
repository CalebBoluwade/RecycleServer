import dotenv from 'dotenv';
dotenv.config();
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './Config/index.config';
import bodyParser from 'body-parser';
import { initializeUnhandledException } from './Utils/ErrorHandler.util';
import ServerlessHttp from 'serverless-http';
// import https from 'https';
// import fs from 'fs';
// import path from 'path';
import { App, Route } from './Routes/Route.Index';
import dayjs from 'dayjs';

const router: Application = express();
// export default router;

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
        console.log(`${dayjs().format()} ===> [${req.method} ${req.url}] [THREAD]: [${process.pid}] [IP]: [${req.socket.remoteAddress}]`);

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
    router.get('/', (req, res) => res.send('main'));
    // router.use('/', Route);
    router.use('/.netlify/functions/server', Route);

    App(router);

    router.listen(process.env.PORT, () => {
        console.log(`Server started on Port ${process.env.PORT}`);

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

module.exports.handler = ServerlessHttp(router);
