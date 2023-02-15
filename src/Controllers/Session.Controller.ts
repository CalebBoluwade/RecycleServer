import { NextFunction, Request, Response } from 'express';
import { signJWT } from '../Utils/JWT.util';

const SessionController = () => (req: Request, res: Response, next: NextFunction) => {
    const accessToken = signJWT(req.body);

    // console.log(accessToken);
    // if (accessToken) {
    //     next();
    // httpCode: error.httpCode;
    // }
};

export default SessionController;
