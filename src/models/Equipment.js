const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['kayak', 'canoe'],
    required: [true, 'Equipment type is required']
  },
  name: {
    type: String,
    required: [true, 'Equipment name is required'],
    trim: true
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
    min: 1
  },
  pricePerHour: {
    type: Number,
    required: [true, 'Price per hour is required'],
    min: 0
  },
  description: {
    type: String,
    trim: true
  },
  isAvailable: {
    type: Boolean,
    default: true
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
equipmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Equipment', equipmentSchema);
