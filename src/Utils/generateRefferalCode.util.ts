import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../Controllers/Auth/User.model';

const GenerateReferalCode = (email: string) => {
    var text = '';
    var possible = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$`;

    for (var i = 0; i < 10; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

const GetReferalCode = (Request: Request, Response: Response, next: NextFunction) => {
    if (Request.body.email) {
        const refCode = GenerateReferalCode(Request.body.ref);
        Response.status(201).json({
            status: 'success',
            code: refCode
        });
    } else {
        Response.status(400).json({
            status: 'failed',
            code: null,
            email: 'not passed in the request'
        });
    }
};

export default GetReferalCode;
