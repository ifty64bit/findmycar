import { Schema, model } from "mongoose";
import { Car } from "../types";

const carSchema = new Schema<Car>({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    seats: { type: Number, required: true },
    image: [{ type: String, required: true }],
    views: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true }
});

export default model<Car>("Cars", carSchema);