import { Schema, model } from "mongoose";
import { Bookmark } from "../types";

const bookmarkSchema = new Schema<Bookmark>({
    user: { type: Schema.Types.ObjectId, ref: "Users" },
    car: { type: Schema.Types.ObjectId, ref: "Cars" },
});

bookmarkSchema.index({ user: 1, car: 1 }, { unique: true });

export default model<Bookmark>("Bookmarks", bookmarkSchema);
