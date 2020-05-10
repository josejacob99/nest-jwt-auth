import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IUsers } from '../interface/user.interface';

const SALT_WORK_FACTOR = 10;
export const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    fcmToken: String,
    isAdmin: {
        type: Boolean,
        default: false,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    phoneVerified: {
        type: Boolean,
        default: false,
    },
    otp: {
        code: String,
        expiry: Date,
    },
}, {
    timestamps: true,
});

UserSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

UserSchema.set('toJSON', {
    virtuals: true,
});

UserSchema.pre<IUsers>('save', function(next) {
    const user = this;

    if (!user.isModified('password')) { return next(); }

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) { return next(err); }

        bcrypt.hash(user.password, salt, (e, hash) => {
            if (e) { return next(e); }

            user.password = hash;
            next();
        });
    });
});

UserSchema.method('comparePassword', (password: string, hash: string) => {
    return new Promise((resolve, error) => {
        bcrypt.compare(password, hash, (err, success) => {
            if (err) { return error(err); }
            resolve(success);
        });
    });
});
