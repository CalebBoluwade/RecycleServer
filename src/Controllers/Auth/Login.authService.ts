import { NextFunction, Request, Response } from 'express';
import User from './User.model';
import lodash from 'lodash';
import { LoginUserInput } from './auth.schema';
import { handleError } from '../../Utils/ErrorHandler.util';
import { signJWT } from '../../Security/jwt.secure';

const letUsersLogin = async (req: Request<{}, {}, LoginUserInput>, res: Response, next: NextFunction) => {
    let { user, password }: { user: string; password: string } = req.body;

    try {
        let existingUser = await User.findOne({ $or: [{ email: user.toLowerCase() }, { phoneNumber: `+234${user}` }] });

        if (existingUser) {
            const isValid = await existingUser.validatePassword(password);
            if (isValid) {
                let authenticatedUser = lodash.omit(existingUser, ['password']);
                // req?.user = authenticatedUser;
                return res.status(200).json({ data: authenticatedUser, message: 'Login Successful', accessToken: signJWT(authenticatedUser._id) });
            } else {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        }

        if (!existingUser) {
            // next('User not found');
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        handleError(err, res);
        return res.status(500).json({ message: 'something went wrong' });
    }
};

export default letUsersLogin;
