import jwt from 'jsonwebtoken';

export const signJWT = (id: string, type: string) => {
    return jwt.sign({ _id: id, userType: type }, String(process.env.privateKey), {
        expiresIn: '1d'
    });
};

export const verifyJWT = (token: string) => {
    try {
        const decoded = jwt.verify(token, String(process.env.privateKey));

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
