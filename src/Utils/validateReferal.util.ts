import { NextFunction, Request, Response } from 'express';
import User from '../Controllers/Auth/User.model';

const ValidateRefCode = async (Request: Request, Response: Response, next: NextFunction) => {
    let { ref } = Request.body;

    try {
        const existingUserRefCode = await User.findOne({ refCode: ref });

        if (!existingUserRefCode) {
            Response.status(404).send("Code doesn't exist or can't be validated at this time");
        } else {
            console.log(existingUserRefCode);
            Response.status(200);
        }
    } catch (err) {
        console.error(err);
        Response.status(400).send('An error occured');
    }
};

export default ValidateRefCode;
