import dayjs from 'dayjs';
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError, z } from 'zod';
import { Res } from '../Schema/Response.schema';

const ValidateRequest = (schema: AnyZodObject) => (req: Request, res: Response<Res>, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });

        console.log(
            `REQUEST: ${dayjs().format()}`,
            // schema.parse({
            req?.body,
            req?.params,
            req?.query
            // })
        );
        next();
    } catch (e: any) {
        console.error(e.errors[0].message);

        // if (e instanceof ZodError) {
        //     // Handle validation error
        //     res.status(400).json({ message: 'Invalid request body', errors: error.issues });
        // } else {
        //     // Handle other errors
        //     res.status(500).json({ message: 'Internal Server Error' });
        // }
        return res.status(400).send({ message: e.errors[0].message, data: null, error: e });
    }
};

export default ValidateRequest;
