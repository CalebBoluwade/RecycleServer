import mongoose, { Document, Schema } from 'mongoose';
// import argo2 from 'argon2';
import { customerStatus } from '../../Utils/Types.utils';

export interface IUser {
    fullName: string;
    email: string;
    password: string;
    userType: string;
    address: string | null;
    verificationCode: {
        OTP: string;
        expiresIn: number;
        expirationTime: number;
    };
    refCode: string;
    refCodeCount: number;
    phoneNumber: string;
    status: customerStatus;
}

export interface IUserModel extends IUser, Document {
    createdAt: Date;
    updatedAt: Date;
    validatePassword(inputPassword: string): Promise<Boolean>;
}

const userSchema: Schema = new Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            lowercase: true,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        userType: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: false
        },
        refCode: {
            type: String,
            required: false
        },
        refCodeCount: {
            required: false,
            type: Number
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true
        },
        verificationCode: {
            type: Object,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// userSchema.pre<IUserModel>('save', async (next) => {
//     const user: IUserModel = this;

//   if (!user.isModified('password')) {
//       return next();
//   }
//     const userHashedPwd = await argo2.hash(user.password);
// });

// userSchema.pre('save', function (next) {
// if (this.isModified('password')) {
// bcrypt.hash(this.password, 8, (err, hash) => {
//     if (err) return next(err);

//     this.password = hash;
//     next();
// });
// }
// });

userSchema.methods.validatePassword = async function (inputPassword: string): Promise<boolean> {
    const user = this as IUserModel;

    return true;
    // return await argo2.verify(user.password, inputPassword).catch((e) => {
    //     console.log(e);
    //     return false;
    // });
};

// const x = () => {}

// userSchema.methods.x

export default mongoose.model<IUserModel>('User', userSchema);
