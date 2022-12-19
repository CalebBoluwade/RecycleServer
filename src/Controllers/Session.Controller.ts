import { NextFunction, Request, Response } from 'express';
import { signJWT } from '../Utils/jwt.utils';

const SessionController = () => (req: Request, res: Response, next: NextFunction) => {
    const accessToken = signJWT(req.body);
};
