const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['kayak', 'canoe'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  pricePerHour: {
    type: Number,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
});

const reservationSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  customerEmail: {
    type: String,
    required: [true, 'Customer email is required'],
    lowercase: true,
    trim: true
  },
  customerPhone: {
    type: String,
    required: [true, 'Customer phone is required'],
    trim: true
  },
  equipment: {
    type: equipmentSchema,
    required: [true, 'Equipment is required']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  duration: {
    type: Number, // in hours
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true
  },
  createdBy: {
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
reservationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Calculate duration and total amount before saving
reservationSchema.pre('save', function(next) {
  if (this.startDate && this.endDate && this.equipment && this.equipment.pricePerHour) {
    const durationMs = this.endDate - this.startDate;
    this.duration = Math.ceil(durationMs / (1000 * 60 * 60)); // Convert to hours
    this.totalAmount = this.duration * this.equipment.pricePerHour;
  }
  next();
});

module.exports = mongoose.model('Reservation', reservationSchema);
