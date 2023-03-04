import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { verifyJWT } from '../Security/jwt.secure';

const SessionController =
    () =>
    (req: Request, res: Response, next: NextFunction): void => {
        try {
            const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');
            const user = verifyJWT(accessToken);

            // console.log(user, accessToken);
            if (user.valid) {
                res.locals.user = user;
                console.log('Request Accepted.', 'endpoint: ', req.url);
                return next();
            } else {
                console.warn('Request Declined.', 'Reason: ', accessToken ? 'Expired / Invalid Token' : 'No Token Provided');
                res.status(403).send({ message: accessToken ? 'Expired / Invalid Token' : 'No Token Provided' });
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
