const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getAdmins,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  getMe,
  updatePassword
} = require('../controllers/adminController');

const { protect, restrictTo } = require('../middleware/auth');

// Public routes
router.post('/login', login);

// Protected routes
router.use(protect);

router.get('/me', getMe);
router.put('/updatepassword', updatePassword);
router.get('/', getAdmins);
router.get('/:id', getAdmin);
router.put('/:id', updateAdmin);

// Super admin only routes
router.post('/register', restrictTo('super_admin'), register);
router.delete('/:id', restrictTo('super_admin'), deleteAdmin);

module.exports = router;
