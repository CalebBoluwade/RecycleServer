import dotenv from 'dotenv';
dotenv.config();
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dayjs from 'dayjs';
import { config } from './Config/index.config';
import bodyParser from 'body-parser';
import ServerlessHttp from 'serverless-http';
import { App, Route } from './Routes/Route.Index';
import { initializeUnhandledException } from './Utils/ErrorHandler.util';
import relativeTime from 'dayjs/plugin/relativeTime';
// import https from 'https';
// import fs from 'fs';
// import path from 'path';

const router: Application = express();

dayjs.extend(relativeTime);
// const startHttpsServer = () => {
mongoose.set('strictQuery', false);
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        console.log(`${dayjs().format()} Connected: Mongo Atlas Database`);
    })
    .catch((err) => console.log(err.message));

const connection = mongoose.connection;

connection.on('reconnected', () => {
    console.log(`${dayjs().format()} Reestablished: Mongo Atlas Database Connection`);
});
connection.on('disconnected', () => {
    console.log(`${dayjs().format()} Disconnected: Mongo Atlas Database`);
    console.log(`${dayjs().format()} Reconnecting: Mongo Atlas Database`);

    // setTimeout(() => {
    mongoose
        .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
        .then(() => {
            console.log('Mongo Atlas Database Connected');
            // startHttpsServer();
        })
        .catch((err) => console.log(err.message));
    // }, 3000);
});
connection.on('close', () => {
    console.log('Mongo Connection Closed');
});
connection.on('error', (error: Error) => {
    console.log('Mongo Connection ERROR: ' + error);
});

router.use((req, res, next) => {
    console.log(`${dayjs().format()} [${req.method} ${req.url}] [THREAD]: [${process.pid}] [IP]: [${req.socket.remoteAddress}]`);

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
// router.get('/', (req, res) => res.send('main'));
router.use('/api/v1', Route);

App(router);

// router.listen(process.env.PORT, () => {
//     console.log(`Server started on Port ${process.env.PORT}`);
// });
// };

// startHttpsServer();
module.exports.handler = ServerlessHttp(router);
