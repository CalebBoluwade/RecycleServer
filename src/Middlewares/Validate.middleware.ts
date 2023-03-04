import dayjs from 'dayjs';
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const ValidateRequest = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });

        console.log(
            `REQUEST: ${dayjs().format()}`,
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            })
        );
        next();
    } catch (e: any) {
        console.error(e.errors);
        return res.status(400).send(e.errors);
    }
};

export default ValidateRequest;
