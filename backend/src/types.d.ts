import { Document } from "mongoose";

export interface User extends Document {
    _id: string;
    name: string;
    email: string;
    displayPhoto: string;
    password: string;
    isVerified: boolean;
    token: string;
    verificationToken: string;
    loginAttempts: number;
    lastLoginAttempt: Date;
    lockedUntil: Date | null;
    lastFailedLoginAttempt: Date | null;
}

export interface Car extends Document {
    _id: string;
    name: string;
    brand: string;
    year: number;
    price: number;
    description: string;
    seats: number;
    images: string[];
    views: number;
    isAvailable: boolean;
    owner: User | string;
}

export interface Bookmark extends Document {
    user: Types.ObjectId;
    car: Types.ObjectId;
}
