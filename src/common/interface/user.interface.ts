import { Document } from 'mongoose';

export interface IUsers extends Document  {
    id?: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    isAdmin: boolean;
    emailVerified: boolean;
    phoneVerified: boolean;
    fcmToken: string;
    otp?: {
        code: string;
        expiry: Date;
    };
    phoneOtp?: {
        code: string;
        expiry: Date;
    };
    comparePassword?: any;
}
