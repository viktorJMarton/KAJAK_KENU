const express = require('express');
const router = express.Router();
const {
  createEquipment,
  getEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment
} = require('../controllers/equipmentController');

const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getEquipment);
router.get('/:id', getEquipmentById);

// Protected routes
router.post('/', protect, createEquipment);
router.put('/:id', protect, updateEquipment);
router.delete('/:id', protect, deleteEquipment);

module.exports = router;
