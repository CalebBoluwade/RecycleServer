import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../Models/User';

const UserCreation = (req: Request, res: Response, next: NextFunction) => {
    const { email, userType, fullName, password } = req.body;

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        fullName,
        email,
        password,
        userType
    });

    return user
        .save()
        .then((newUser) => res.status(201).json({ newUser }))
        .catch((err) => res.status(201).json({ err }));
};

export default UserCreation;
