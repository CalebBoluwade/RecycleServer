import jwt from 'jsonwebtoken';

const privateKey = '';
const publicKey = '';

export const signJWT = (requestBody: Object) => {
    return jwt.sign(requestBody, privateKey);
};

export const verifyJWT = (token: string) => {
    try {
        const decoded = jwt.verify(token, publicKey);

        return {
            valid: true,
            expired: false,
            decoded: decoded
        };
    } catch (error: any) {
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        };
    }
};
