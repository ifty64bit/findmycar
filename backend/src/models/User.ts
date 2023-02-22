import { Schema, model } from "mongoose";
import { User } from "../types";

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    displayPhoto: { type: String, default: null },
    password: { type: String, required: true, max:124, min:6 },
    isVerified: { type: Boolean, default: false },
    token: { type: String, default: null },
    verificationToken: { type: String, default: null },
    loginAttempts: { type: Number, default: 0 },
    lastLoginAttempt: { type: Date, default: null },
    lastFailedLoginAttempt: { type: Date, default: null },
    lockedUntil: { type: Date, default: null },
    bookmarks: [{ type: Schema.Types.ObjectId, ref: "Cars" }]
});

export default model<User>("Users", userSchema);