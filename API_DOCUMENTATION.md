# KAJAK KENU Backend API Documentation

## Overview
Backend API for kayak and canoe rental system with admin management, reservations, and payment processing.

## Tech Stack
- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT Authentication
- bcrypt for password hashing

## Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or remote instance)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file in the root directory:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/kajak_kenu
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRES_IN=7d
DEFAULT_ADMIN_EMAIL=admin@kajakenu.com
DEFAULT_ADMIN_PASSWORD=admin123
```

3. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

4. Default admin credentials:
- Email: admin@kajakenu.com
- Password: admin123

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Admin Endpoints

### 1. Login Admin
**POST** `/api/admins/login`

**Public**

Request Body:
```json
{
  "email": "admin@kajakenu.com",
  "password": "admin123"
}
```

Response:
```json
{
  "success": true,
  "token": "jwt-token-here",
  "admin": {
    "_id": "admin-id",
    "name": "Super Admin",
    "email": "admin@kajakenu.com",
    "role": "super_admin",
    "isActive": true
  }
}
```

### 2. Register New Admin
**POST** `/api/admins/register`

**Private** (Super Admin only)

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "admin"
}
```

### 3. Get All Admins
**GET** `/api/admins`

**Private**

Response:
```json
{
  "success": true,
  "count": 2,
  "data": [...]
}
```

### 4. Get Single Admin
**GET** `/api/admins/:id`

**Private**

### 5. Update Admin
**PUT** `/api/admins/:id`

**Private**

Request Body:
```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "role": "admin",
  "isActive": true
}
```

### 6. Delete Admin
**DELETE** `/api/admins/:id`

**Private** (Super Admin only)

### 7. Get Current Admin
**GET** `/api/admins/me`

**Private**

### 8. Update Password
**PUT** `/api/admins/updatepassword`

**Private**

Request Body:
```json
{
  "currentPassword": "old-password",
  "newPassword": "new-password"
}
```

---

## Equipment Endpoints

### 1. Create Equipment
**POST** `/api/equipment`

**Private**

Request Body:
```json
{
  "type": "kayak",
  "name": "Single Kayak",
  "capacity": 1,
  "pricePerHour": 15,
  "description": "Lightweight single-person kayak",
  "isAvailable": true
}
```

### 2. Get All Equipment
**GET** `/api/equipment`

**Public**

Query Parameters:
- `type`: Filter by type (kayak/canoe)
- `isAvailable`: Filter by availability (true/false)

### 3. Get Single Equipment
**GET** `/api/equipment/:id`

**Public**

### 4. Update Equipment
**PUT** `/api/equipment/:id`

**Private**

### 5. Delete Equipment
**DELETE** `/api/equipment/:id`

**Private**

---

## Reservation Endpoints

### 1. Create Reservation
**POST** `/api/reservations`

**Private**

Request Body:
```json
{
  "customerName": "Jane Smith",
  "customerEmail": "jane@example.com",
  "customerPhone": "+1234567890",
  "equipment": {
    "_id": "equipment-id"
  },
  "startDate": "2025-10-30T10:00:00Z",
  "endDate": "2025-10-30T14:00:00Z",
  "notes": "Optional notes"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "_id": "reservation-id",
    "customerName": "Jane Smith",
    "customerEmail": "jane@example.com",
    "customerPhone": "+1234567890",
    "equipment": {
      "type": "kayak",
      "name": "Single Kayak",
      "capacity": 1,
      "pricePerHour": 15
    },
    "startDate": "2025-10-30T10:00:00Z",
    "endDate": "2025-10-30T14:00:00Z",
    "duration": 4,
    "totalAmount": 60,
    "status": "pending"
  }
}
```

### 2. Get All Reservations
**GET** `/api/reservations`

**Private**

Query Parameters:
- `status`: Filter by status (pending/confirmed/cancelled/completed)
- `startDate`: Filter by start date
- `endDate`: Filter by end date

### 3. Get Single Reservation
**GET** `/api/reservations/:id`

**Private**

### 4. Update Reservation
**PUT** `/api/reservations/:id`

**Private**

Request Body:
```json
{
  "customerName": "Updated Name",
  "status": "confirmed",
  "notes": "Updated notes"
}
```

### 5. Delete Reservation
**DELETE** `/api/reservations/:id`

**Private**

### 6. Get Reservation Statistics
**GET** `/api/reservations/stats/overview`

**Private**

Response:
```json
{
  "success": true,
  "data": {
    "totalReservations": 100,
    "pendingReservations": 10,
    "confirmedReservations": 50,
    "completedReservations": 35,
    "cancelledReservations": 5,
    "totalRevenue": 15000
  }
}
```

---

## Payment Endpoints

### 1. Create Payment
**POST** `/api/payments`

**Private**

Request Body:
```json
{
  "reservation": "reservation-id",
  "amount": 60,
  "paymentMethod": "card",
  "transactionId": "TRX123456",
  "notes": "Optional notes"
}
```

### 2. Get All Payments
**GET** `/api/payments`

**Private**

Query Parameters:
- `status`: Filter by status (pending/completed/failed/refunded)
- `paymentMethod`: Filter by payment method (cash/card/bank_transfer/online)
- `startDate`: Filter by start date
- `endDate`: Filter by end date

### 3. Get Single Payment
**GET** `/api/payments/:id`

**Private**

### 4. Update Payment
**PUT** `/api/payments/:id`

**Private**

Request Body:
```json
{
  "status": "completed",
  "transactionId": "TRX123456",
  "notes": "Payment processed"
}
```

### 5. Delete Payment
**DELETE** `/api/payments/:id`

**Private**

### 6. Refund Payment
**POST** `/api/payments/:id/refund`

**Private**

### 7. Get Payment Statistics
**GET** `/api/payments/stats/overview`

**Private**

Response:
```json
{
  "success": true,
  "data": {
    "totalPayments": 90,
    "completedPayments": 85,
    "pendingPayments": 3,
    "failedPayments": 1,
    "refundedPayments": 1,
    "totalRevenue": 15000,
    "refundedAmount": 200,
    "revenueByMethod": [
      { "_id": "card", "total": 10000 },
      { "_id": "cash", "total": 5000 }
    ]
  }
}
```

---

## Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "error": "Error message"
}
```

### Common HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Server Error

---

## Data Models

### Admin
- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- role (String: 'admin' | 'super_admin')
- isActive (Boolean)
- createdAt (Date)
- updatedAt (Date)

### Equipment
- type (String: 'kayak' | 'canoe')
- name (String, required)
- capacity (Number, required)
- pricePerHour (Number, required)
- description (String)
- isAvailable (Boolean)
- createdAt (Date)
- updatedAt (Date)

### Reservation
- customerName (String, required)
- customerEmail (String, required)
- customerPhone (String, required)
- equipment (Object, required)
- startDate (Date, required)
- endDate (Date, required)
- duration (Number, auto-calculated in hours)
- totalAmount (Number, auto-calculated)
- status (String: 'pending' | 'confirmed' | 'cancelled' | 'completed')
- notes (String)
- createdBy (Admin reference)
- createdAt (Date)
- updatedAt (Date)

### Payment
- reservation (Reservation reference, required)
- amount (Number, required)
- paymentMethod (String: 'cash' | 'card' | 'bank_transfer' | 'online')
- status (String: 'pending' | 'completed' | 'failed' | 'refunded')
- transactionId (String, unique)
- paidAt (Date)
- refundedAt (Date)
- notes (String)
- processedBy (Admin reference)
- createdAt (Date)
- updatedAt (Date)

---

## Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt
2. **JWT Authentication**: Secure token-based authentication
3. **Role-Based Access Control**: Different access levels for admin and super_admin
4. **CORS Protection**: Configurable cross-origin requests
5. **Helmet Security**: Security headers protection
6. **Input Validation**: Mongoose schema validation

---

## Development

### Testing
```bash
npm test
```

### Environment Variables
See `.env.example` for all required environment variables.

### Project Structure
```
src/
├── config/          # Configuration files
├── controllers/     # Request handlers
├── middleware/      # Custom middleware
├── models/          # Database models
├── routes/          # API routes
├── utils/           # Helper functions
├── app.js           # Express app setup
└── server.js        # Server entry point
```
