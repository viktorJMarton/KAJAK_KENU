require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/database');
const Admin = require('./models/Admin');

const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Create default admin if none exists
const createDefaultAdmin = async () => {
  try {
    const adminCount = await Admin.countDocuments();
    
    if (adminCount === 0) {
      await Admin.create({
        name: 'Super Admin',
        email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@kajakenu.com',
        password: process.env.DEFAULT_ADMIN_PASSWORD || 'admin123',
        role: 'super_admin'
      });
      console.log('Default admin created successfully');
    }
  } catch (error) {
    console.error('Error creating default admin:', error.message);
  }
};

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  createDefaultAdmin();
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = server;
