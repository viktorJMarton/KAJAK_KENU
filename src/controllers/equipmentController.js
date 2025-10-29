const Equipment = require('../models/Equipment');

// @desc    Create new equipment
// @route   POST /api/equipment
// @access  Private
exports.createEquipment = async (req, res, next) => {
  try {
    const { type, name, capacity, pricePerHour, description, isAvailable } = req.body;

    const equipment = await Equipment.create({
      type,
      name,
      capacity,
      pricePerHour,
      description,
      isAvailable
    });

    res.status(201).json({
      success: true,
      data: equipment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all equipment
// @route   GET /api/equipment
// @access  Public
exports.getEquipment = async (req, res, next) => {
  try {
    const { type, isAvailable } = req.query;
    let query = {};

    // Filter by type
    if (type) {
      query.type = type;
    }

    // Filter by availability
    if (isAvailable !== undefined) {
      query.isAvailable = isAvailable === 'true';
    }

    const equipment = await Equipment.find(query).sort('type name');

    res.status(200).json({
      success: true,
      count: equipment.length,
      data: equipment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single equipment
// @route   GET /api/equipment/:id
// @access  Public
exports.getEquipmentById = async (req, res, next) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: 'Equipment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: equipment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update equipment
// @route   PUT /api/equipment/:id
// @access  Private
exports.updateEquipment = async (req, res, next) => {
  try {
    let equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: 'Equipment not found'
      });
    }

    const { type, name, capacity, pricePerHour, description, isAvailable } = req.body;

    // Update fields
    if (type) equipment.type = type;
    if (name) equipment.name = name;
    if (capacity) equipment.capacity = capacity;
    if (pricePerHour) equipment.pricePerHour = pricePerHour;
    if (description) equipment.description = description;
    if (typeof isAvailable !== 'undefined') equipment.isAvailable = isAvailable;

    await equipment.save();

    res.status(200).json({
      success: true,
      data: equipment
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete equipment
// @route   DELETE /api/equipment/:id
// @access  Private
exports.deleteEquipment = async (req, res, next) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: 'Equipment not found'
      });
    }

    await equipment.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
