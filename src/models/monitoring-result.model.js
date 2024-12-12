import mongoose from 'mongoose';

const monitoringResultSchema = new mongoose.Schema({
  endpoint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Endpoint',
    required: true
  },
  statusCode: {
    type: Number,
    required: true
  },
  responseTime: {
    type: Number,
    required: true
  },
  error: {
    type: String
  }
}, {
  timestamps: true
});

export const MonitoringResult = mongoose.model('MonitoringResult', monitoringResultSchema);