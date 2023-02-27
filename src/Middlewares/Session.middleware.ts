import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { verifyJWT } from '../Security/jwt.secure';

const SessionController = () => (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
        const user = verifyJWT(accessToken);

        // console.log(user, accessToken);
        if (user.valid) {
            res.locals.user = user;
            return next();
        } else {
            res.status(403).end('unauthorized');
        }
    } catch (error) {
        res.send('unable to verify user');
    }

    // console.log(accessToken);
    // if (accessToken) {
    //     next();
    // httpCode: error.httpCode;
    // }
};

export default SessionController;
