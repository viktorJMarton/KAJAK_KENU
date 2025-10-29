# KAJAK_KENU

Backend API for a kayak and canoe rental management system.

## Features

### Admin Management (CRUD)
- Create, read, update, and delete admin users
- Role-based access control (admin, super_admin)
- Secure authentication with JWT
- Password management and hashing

### Reservation System (CRUD)
- Create, read, update, and delete reservations
- Customer information management
- Equipment assignment
- Automatic duration and price calculation
- Status tracking (pending, confirmed, cancelled, completed)
- Reservation statistics and reporting

### Payment Processing (CRUD)
- Create, read, update, and delete payment records
- Multiple payment methods (cash, card, bank transfer, online)
- Payment status tracking (pending, completed, failed, refunded)
- Refund processing
- Payment statistics and revenue reporting

### Equipment Management
- Create, read, update, and delete equipment
- Support for kayaks and canoes
- Capacity and pricing management
- Availability tracking

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file based on `.env.example`

3. Start the server:
```bash
npm run dev
```

4. Default admin login:
- Email: admin@kajakenu.com
- Password: admin123

## Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API documentation.

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing