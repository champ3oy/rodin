import mongoose from "mongoose";
const endpointSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    interval: {
        type: Number,
        default: 60,
        min: 30,
        max: 3600,
    },
    active: {
        type: Boolean,
        default: true,
    },
    type: {
        type: String,
        enum: ["service", "website"],
        default: "website",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
export const Endpoint = mongoose.model("Endpoint", endpointSchema);
