import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import TransactionSchema from './Transactions.model';

const NewTransaction = async (req: Request, res: Response, next: NextFunction) => {
    const { email, userType, fullName, password } = req.body;

    const Transaction = new TransactionSchema({
        _id: new mongoose.Types.ObjectId(),
        fullName,
        email,
        password,
        userType
    });

    try {
        const newUser = await Transaction.save();
        return res.status(201).json({ newUser });
    } catch (err) {
        return res.status(403).json({ err });
    }

    // next()
};

export default NewTransaction;
