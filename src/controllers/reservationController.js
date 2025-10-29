const Reservation = require('../models/Reservation');
const Equipment = require('../models/Equipment');
const { sanitizeString, isValidObjectId } = require('../utils/validation');
const { RESERVATION_STATUSES } = require('../config/constants');

// @desc    Create new reservation
// @route   POST /api/reservations
// @access  Private
exports.createReservation = async (req, res, next) => {
  try {
    const { customerName, customerEmail, customerPhone, equipment, startDate, endDate, notes } = req.body;

    // Validate equipment ObjectId format
    const equipmentId = equipment._id || equipment;
    if (!isValidObjectId(equipmentId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid equipment ID format'
      });
    }

    // Validate equipment
    const equipmentExists = await Equipment.findById(equipmentId);
    if (!equipmentExists) {
      return res.status(404).json({
        success: false,
        message: 'Equipment not found'
      });
    }

    // Check if equipment is available
    if (!equipmentExists.isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Equipment is not available'
      });
    }

    // Create reservation with equipment details
    const reservation = await Reservation.create({
      customerName,
      customerEmail,
      customerPhone,
      equipment: {
        type: equipmentExists.type,
        name: equipmentExists.name,
        capacity: equipmentExists.capacity,
        pricePerHour: equipmentExists.pricePerHour,
        isAvailable: equipmentExists.isAvailable
      },
      startDate,
      endDate,
      notes,
      createdBy: req.admin._id
    });

    res.status(201).json({
      success: true,
      data: reservation
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reservations
// @route   GET /api/reservations
// @access  Private
exports.getReservations = async (req, res, next) => {
  try {
    const { status, startDate, endDate } = req.query;
    let query = {};

    // Filter by status - sanitize and validate input
    if (status) {
      const sanitizedStatus = sanitizeString(status);
      if (RESERVATION_STATUSES.includes(sanitizedStatus)) {
        query.status = sanitizedStatus;
      }
    }

    // Filter by date range
    if (startDate && endDate) {
      query.startDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const reservations = await Reservation.find(query)
      .populate('createdBy', 'name email')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single reservation
// @route   GET /api/reservations/:id
// @access  Private
exports.getReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    res.status(200).json({
      success: true,
      data: reservation
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update reservation
// @route   PUT /api/reservations/:id
// @access  Private
exports.updateReservation = async (req, res, next) => {
  try {
    let reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    const { customerName, customerEmail, customerPhone, startDate, endDate, status, notes } = req.body;

    // Update fields
    if (customerName) reservation.customerName = customerName;
    if (customerEmail) reservation.customerEmail = customerEmail;
    if (customerPhone) reservation.customerPhone = customerPhone;
    if (startDate) reservation.startDate = startDate;
    if (endDate) reservation.endDate = endDate;
    if (status) reservation.status = status;
    if (notes) reservation.notes = notes;

    await reservation.save();

    res.status(200).json({
      success: true,
      data: reservation
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete reservation
// @route   DELETE /api/reservations/:id
// @access  Private
exports.deleteReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    await reservation.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get reservation statistics
// @route   GET /api/reservations/stats/overview
// @access  Private
exports.getReservationStats = async (req, res, next) => {
  try {
    const totalReservations = await Reservation.countDocuments();
    const pendingReservations = await Reservation.countDocuments({ status: 'pending' });
    const confirmedReservations = await Reservation.countDocuments({ status: 'confirmed' });
    const completedReservations = await Reservation.countDocuments({ status: 'completed' });
    const cancelledReservations = await Reservation.countDocuments({ status: 'cancelled' });

    // Calculate total revenue from completed reservations
    const completedRevenue = await Reservation.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalReservations,
        pendingReservations,
        confirmedReservations,
        completedReservations,
        cancelledReservations,
        totalRevenue: completedRevenue[0]?.total || 0
      }
    });
  } catch (error) {
    next(error);
  }
};
