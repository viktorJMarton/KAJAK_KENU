const express = require('express');
const router = express.Router();
const {
  createReservation,
  getReservations,
  getReservation,
  updateReservation,
  deleteReservation,
  getReservationStats
} = require('../controllers/reservationController');

const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.route('/')
  .get(getReservations)
  .post(createReservation);

router.get('/stats/overview', getReservationStats);

router.route('/:id')
  .get(getReservation)
  .put(updateReservation)
  .delete(deleteReservation);

module.exports = router;
