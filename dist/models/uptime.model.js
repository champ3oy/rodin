import mongoose from 'mongoose';
const uptimeSchema = new mongoose.Schema({
    endpoint: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Endpoint',
        required: true,
        unique: true
    },
    totalChecks: {
        type: Number,
        default: 0
    },
    successfulChecks: {
        type: Number,
        default: 0
    },
    uptimePercentage: {
        type: Number,
        default: 100
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    totalDowntime: {
        type: Number,
        default: 0
    },
    lastDowntimeStart: Date
}, {
    timestamps: true
});
export const Uptime = mongoose.model('Uptime', uptimeSchema);
