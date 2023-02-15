import { NextFunction, Request, Response } from 'express';

export async function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    const status = ((err as any).status as any) || 500;
    const message = err.message || 'Something went wrong';
    res.status(status).send({
        message
    });
}

// export default class ErrorHandler {
export const handleError = async (err: any, res: Response) => {
    const statusCode = err.statusCode || 500;
    console.error('error occurred: ', err.toString(), statusCode);
    res.status(statusCode).send({
        success: false,
        message: err.message,
        rawErrors: (err.rawErrors ??= []),
        stack: err.stack
    });
};

export const initializeUnhandledException = () => {
    process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
        console.log(reason.name, reason.message);
        console.log('UNHANDLED REJECTION! 💥 Shutting down...');
        throw reason;
    });

    process.on('uncaughtException', (err: Error) => {
        console.log(err.name, err.message);
        console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
        process.exit(1);
    });
};
