import { Request, Response } from 'express';
import User from './User.model';
import lodash from 'lodash';
import { LoginSchema } from './auth.schema';
import { handleError } from '../../Utils/ErrorHandler.util';

const letUsersLogin = async (req: Request<{}, {}, LoginSchema['body']>, res: Response) => {
    let { email, password }: { email: string; password: string } = req.body;

    try {
        const existingUser = await User.findOne({ email: email.toLowerCase() }).lean();

        if (existingUser) {
            lodash.omit(existingUser, ['password']);
            if (password === existingUser?.password) {
                return res.status(200).json({ existingUser });
            } else {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
        }

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        handleError(err, res);
    }
};

export default letUsersLogin;
