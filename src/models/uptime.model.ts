import mongoose, { Document } from 'mongoose';
import { IEndpoint } from './endpoint.model.js';

export interface IUptime extends Document {
  endpoint: IEndpoint['_id'];
  totalChecks: number;
  successfulChecks: number;
  uptimePercentage: number;
  lastUpdated: Date;
  totalDowntime: number; // in minutes
  lastDowntimeStart?: Date;
}

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

export const Uptime = mongoose.model<IUptime>('Uptime', uptimeSchema);