# KAJAK_KENU - Boat Tour Reservation System

A Ruby on Rails MVC web application for managing boat tours and reservations. Built with SOLID principles, Clean Code practices, RESTful architecture, and Test-Driven Development (TDD).

## Features

- **Public Interface:**
  - Browse available boat tours
  - View detailed tour information
  - Make reservations with customer details
  - Form validation and error handling

- **Admin Interface:**
  - Manage all reservations
  - Confirm or cancel reservations
  - Filter reservations by status (Pending, Confirmed, Cancelled)
  - View customer details and tour information

## Technology Stack

- **Framework:** Ruby on Rails 7.1
- **Database:** SQLite3
- **CSS Framework:** Tailwind CSS with DaisyUI
- **Testing:** RSpec with Factory Bot and Shoulda Matchers
- **Containerization:** Docker
- **Web Server:** Puma

## Design Principles

- **SOLID Principles:** Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **Clean Code:** Meaningful names, small functions, proper error handling, DRY principle
- **RESTful Architecture:** Standard HTTP methods and resource-based URLs
- **Test-Driven Development:** Comprehensive test coverage with RSpec

## Prerequisites

- Ruby 3.2.x
- SQLite3
- Bundler

## Installation

1. Clone the repository:
```bash
git clone https://github.com/viktorJMarton/KAJAK_KENU.git
cd KAJAK_KENU
```

2. Install dependencies:
```bash
bundle install
```

3. Setup the database:
```bash
bundle exec rails db:create db:migrate db:seed
```

4. Start the development server:
```bash
bundle exec rails server
```

Or use the Procfile for asset compilation:
```bash
bin/dev
```

5. Visit http://localhost:3000

## Docker Usage

Build and run with Docker:

```bash
docker build -t kajak-kenu .
docker run -p 3000:3000 kajak-kenu
```

## Running Tests

Run all tests:
```bash
bundle exec rspec
```

Run specific test files:
```bash
bundle exec rspec spec/models/
bundle exec rspec spec/controllers/
```

## Project Structure

```
app/
├── controllers/
│   ├── boat_tours_controller.rb       # Public boat tours
│   ├── reservations_controller.rb     # Reservation creation
│   └── admin/
│       └── reservations_controller.rb # Admin management
├── models/
│   ├── boat_tour.rb                   # Tour model with validations
│   └── reservation.rb                 # Reservation model with state management
└── views/
    ├── boat_tours/                    # Tour listing and details
    ├── reservations/                  # Reservation forms
    └── admin/reservations/            # Admin dashboard
```

## Database Schema

### BoatTours
- name (string)
- description (text)
- duration (integer) - in minutes
- capacity (integer)
- price (decimal)
- available_from (date)
- available_to (date)

### Reservations
- boat_tour_id (foreign key)
- customer_name (string)
- customer_email (string)
- customer_phone (string)
- number_of_people (integer)
- reservation_date (date)
- status (string: pending, confirmed, cancelled)

## Routes

### Public Routes
- `GET /` - Home page (boat tours listing)
- `GET /boat_tours` - List all available tours
- `GET /boat_tours/:id` - Show tour details with reservation form
- `POST /boat_tours/:id/reservations` - Create a new reservation

### Admin Routes
- `GET /admin/reservations` - Admin dashboard
- `PATCH /admin/reservations/:id/confirm` - Confirm a reservation
- `PATCH /admin/reservations/:id/cancel` - Cancel a reservation

## Code Quality

- Linting: RuboCop (with Rails and RSpec extensions)
- Code Coverage: SimpleCov
- Best Practices: Clean Code, SOLID principles

## Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for your changes
4. Implement your changes
5. Run tests and ensure they pass
6. Submit a pull request

## License

This project is open source and available under the MIT License.
