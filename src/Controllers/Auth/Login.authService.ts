import { NextFunction, Request, Response } from 'express';
import User from './User.model';
import { omit } from 'lodash';
import { LoginUserInput } from './auth.schema';
import { handleError } from '../../Utils/ErrorHandler.util';
import { signJWT } from '../../Security/jwt.secure';
import { Res } from '../../Schema/Response.schema';

const letUsersLogin = async (req: Request<{}, {}, LoginUserInput>, res: Response<Res>) => {
    let { user, password }: { user: string; password: string } = req.body;

    const RegionNumberPrefix = '+234';
    const formattedNumber = RegionNumberPrefix + user.slice(1, 11);

    try {
        let existingUser = await User.findOne({ $or: [{ email: user.toLowerCase() }, { phoneNumber: formattedNumber }] }).select('-verificationCode, -password');

        if (existingUser) {
            // delete

            const isValid = await existingUser.validatePassword(password);
            if (isValid) {
                let authenticatedUser = omit(existingUser, ['password', 'verificationCode']);
                return res.status(200).json({ data: authenticatedUser, message: 'Login Successful', accessToken: signJWT(authenticatedUser._id) });
            } else {
                return res.status(401).json({ message: 'Invalid email or password', data: null });
            }
        }

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found', data: null });
        }
    } catch (err: any) {
        handleError(err, res);
        return res.status(500).json({ message: 'something went wrong', data: null, error: err });
    }
};

export default letUsersLogin;
