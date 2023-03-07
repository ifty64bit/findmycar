export interface IUser {
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

export interface ICar {
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
    owner: IUser | string;
    offer?: {
        percentage: number;
    };
}
export interface IBookmark {
    user: string | IUser;
    car: string | ICar;
}

export interface ISearch {
    _id: string;
    query: string;
    user: string | IUser;
}

export interface IError {
    errors: [
        {
            msg: string;
        }
    ];
}
