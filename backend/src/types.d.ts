export interface User{
    id: string;
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    token: string;
    verificationToken: string;
    loginAttempts: number;
    lastLoginAttempt: Date;
    bookmarks: string[] | Car[];
}

export interface Car{
    id: string;
    name: string;
    brand: string;
    year: number;
    price: number;
    description: string;
    seats: number;
    image: string[];
    views: number;
    isAvailable: boolean;

}