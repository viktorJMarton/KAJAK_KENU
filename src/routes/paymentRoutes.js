const express = require('express');
const router = express.Router();
const {
  createPayment,
  getPayments,
  getPayment,
  updatePayment,
  deletePayment,
  refundPayment,
  getPaymentStats
} = require('../controllers/paymentController');

const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.route('/')
  .get(getPayments)
  .post(createPayment);

router.get('/stats/overview', getPaymentStats);

router.route('/:id')
  .get(getPayment)
  .put(updatePayment)
  .delete(deletePayment);

router.post('/:id/refund', refundPayment);

module.exports = router;
