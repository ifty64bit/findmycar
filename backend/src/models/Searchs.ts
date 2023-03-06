import { Schema, model } from "mongoose";
import { Search } from "../types";

const searchSchema = new Schema<Search>({
    query: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
    },
});

export default model<Search>("Searchs", searchSchema);