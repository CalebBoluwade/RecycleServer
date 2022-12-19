import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../Models/User';

const letUsersLogin = (req: Request, res: Response, next: NextFunction) => {
    let { email } = req.body;

    return User.findOne({ email })
        .then((existingUser) => res.status(200).json({ existingUser }))
        .catch((err) => {
            console.log(err);
        });
};

export default letUsersLogin;
