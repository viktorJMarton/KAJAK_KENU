/**
 * Validation Script
 * Checks that all modules can be loaded without errors
 */

console.log('🔍 Validating backend structure...\n');

try {
  // Load core modules
  console.log('Loading core modules...');
  const app = require('./src/app');
  console.log('✓ app.js loaded successfully');

  // Load models
  console.log('\nLoading models...');
  const Admin = require('./src/models/Admin');
  console.log('✓ Admin model loaded');
  
  const Reservation = require('./src/models/Reservation');
  console.log('✓ Reservation model loaded');
  
  const Payment = require('./src/models/Payment');
  console.log('✓ Payment model loaded');
  
  const Equipment = require('./src/models/Equipment');
  console.log('✓ Equipment model loaded');

  // Load controllers
  console.log('\nLoading controllers...');
  const adminController = require('./src/controllers/adminController');
  console.log('✓ adminController loaded');
  
  const reservationController = require('./src/controllers/reservationController');
  console.log('✓ reservationController loaded');
  
  const paymentController = require('./src/controllers/paymentController');
  console.log('✓ paymentController loaded');
  
  const equipmentController = require('./src/controllers/equipmentController');
  console.log('✓ equipmentController loaded');

  // Load middleware
  console.log('\nLoading middleware...');
  const auth = require('./src/middleware/auth');
  console.log('✓ auth middleware loaded');
  
  const errorHandler = require('./src/middleware/errorHandler');
  console.log('✓ errorHandler middleware loaded');

  // Load routes
  console.log('\nLoading routes...');
  const adminRoutes = require('./src/routes/adminRoutes');
  console.log('✓ adminRoutes loaded');
  
  const reservationRoutes = require('./src/routes/reservationRoutes');
  console.log('✓ reservationRoutes loaded');
  
  const paymentRoutes = require('./src/routes/paymentRoutes');
  console.log('✓ paymentRoutes loaded');
  
  const equipmentRoutes = require('./src/routes/equipmentRoutes');
  console.log('✓ equipmentRoutes loaded');

  console.log('\n✅ All modules loaded successfully!');
  console.log('\n📋 Summary:');
  console.log('   - 4 Models: Admin, Reservation, Payment, Equipment');
  console.log('   - 4 Controllers: Admin, Reservation, Payment, Equipment');
  console.log('   - 2 Middleware: Auth, ErrorHandler');
  console.log('   - 4 Route files: Admin, Reservation, Payment, Equipment');
  console.log('\n🚀 Backend is ready to use!');
  console.log('\nTo start the server:');
  console.log('   1. Create .env file (see .env.example)');
  console.log('   2. Set up MongoDB connection');
  console.log('   3. Run: npm run dev');
  
  process.exit(0);
} catch (error) {
  console.error('\n❌ Error loading modules:', error.message);
  console.error(error.stack);
  process.exit(1);
}
