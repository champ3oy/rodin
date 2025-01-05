import mongoose from 'mongoose';
const alertSchema = new mongoose.Schema({
    endpoint: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Endpoint',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'resolved'],
        default: 'active'
    },
    message: String,
    failureCount: {
        type: Number,
        default: 1
    },
    firstFailureAt: {
        type: Date,
        default: Date.now
    },
    resolvedAt: Date
}, {
    timestamps: true
});
export const Alert = mongoose.model('Alert', alertSchema);
