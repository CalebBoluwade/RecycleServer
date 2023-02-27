import jwt from 'jsonwebtoken';

const privateKey = 'kaTakaTa';
const publicKey = 'kaTakaTa2';

export const signJWT = (id: any) => {
    return jwt.sign({ _id: id }, privateKey, {
        expiresIn: '1d'
    });
};

export const verifyJWT = (token: string) => {
    try {
        const decoded = jwt.verify(token, privateKey);

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
