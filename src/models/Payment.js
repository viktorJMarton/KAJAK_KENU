const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation',
    required: [true, 'Reservation reference is required']
  },
  amount: {
    type: Number,
    required: [true, 'Payment amount is required']
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'bank_transfer', 'online'],
    required: [true, 'Payment method is required']
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionId: {
    type: String,
    unique: true,
    sparse: true
  },
  paidAt: {
    type: Date
  },
  refundedAt: {
    type: Date
  },
  notes: {
    type: String,
    trim: true
  },
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp
paymentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Set paidAt when status changes to completed
paymentSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'completed' && !this.paidAt) {
    this.paidAt = Date.now();
  }
  if (this.isModified('status') && this.status === 'refunded' && !this.refundedAt) {
    this.refundedAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('Payment', paymentSchema);
