import { NextFunction, Request, Response } from 'express';
import Vendor from './Vendor.model';
import { omit } from 'lodash';
import { LoginUserInput } from '../Auth/auth.schema';
import { handleError } from '../../Utils/ErrorHandler.util';
import { signJWT } from '../../Security/jwt.secure';

const letVendorsLogin = async (req: Request<{}, {}, LoginUserInput>, res: Response, next: NextFunction) => {
    let { user, password }: { user: string; password: string } = req.body;

    const RegionNumberPrefix = '+234';
    const formattedNumber = RegionNumberPrefix + user.slice(1, 11);

    try {
        let existingVendor = await Vendor.findOne({ $or: [{ email: user.toLowerCase() }, { phoneNumber: formattedNumber }] });

        if (existingVendor) {
            const isValid = await existingVendor.validatePassword(password);
            if (isValid) {
                let authenticatedUser = omit(existingVendor, ['password', 'verificationCode']);
                return res.status(200).json({ data: authenticatedUser, message: 'Login Successful', accessToken: signJWT(authenticatedUser._id) });
            } else {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        }

        if (!existingVendor) {
            // next('User not found');
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        handleError(err, res);
        return res.status(500).json({ message: 'something went wrong' });
    }
};

export default letVendorsLogin;
