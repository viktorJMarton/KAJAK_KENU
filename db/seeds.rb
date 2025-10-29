# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

# Clear existing data
puts "Clearing existing data..."
Reservation.destroy_all
BoatTour.destroy_all

# Create boat tours
puts "Creating boat tours..."

BoatTour.create!([
  {
    name: "Peaceful River Kayak Tour",
    description: "Enjoy a serene paddle down our calm river. Perfect for beginners and families. Experience nature at its finest with our expert guides.",
    duration: 120,
    capacity: 8,
    price: 45.00,
    available_from: Date.today,
    available_to: Date.today + 60.days
  },
  {
    name: "Adventure Rapids Kayaking",
    description: "For the thrill-seekers! Navigate exciting rapids and experience the adrenaline rush of white water kayaking. Prior experience recommended.",
    duration: 180,
    capacity: 6,
    price: 75.00,
    available_from: Date.today,
    available_to: Date.today + 90.days
  },
  {
    name: "Sunset Canoe Experience",
    description: "A romantic evening canoe trip perfect for couples. Watch the sunset while gliding across tranquil waters. Includes refreshments.",
    duration: 90,
    capacity: 10,
    price: 55.00,
    available_from: Date.today,
    available_to: Date.today + 45.days
  },
  {
    name: "Wildlife Discovery Tour",
    description: "Explore local wildlife habitats by kayak. Bring your camera for amazing photo opportunities of birds, fish, and other wildlife.",
    duration: 150,
    capacity: 12,
    price: 65.00,
    available_from: Date.today + 7.days,
    available_to: Date.today + 75.days
  },
  {
    name: "Family Fun Paddle",
    description: "Specially designed for families with children. Safe, fun, and educational experience with kid-friendly guides.",
    duration: 60,
    capacity: 15,
    price: 35.00,
    available_from: Date.today,
    available_to: Date.today + 30.days
  }
])

puts "Created #{BoatTour.count} boat tours"

# Create sample reservations
puts "Creating sample reservations..."

tours = BoatTour.all

Reservation.create!([
  {
    boat_tour: tours[0],
    customer_name: "John Smith",
    customer_email: "john.smith@example.com",
    customer_phone: "+1234567890",
    number_of_people: 2,
    reservation_date: Date.tomorrow,
    status: "pending"
  },
  {
    boat_tour: tours[1],
    customer_name: "Sarah Johnson",
    customer_email: "sarah.j@example.com",
    customer_phone: "+1987654321",
    number_of_people: 4,
    reservation_date: Date.today + 3.days,
    status: "confirmed"
  },
  {
    boat_tour: tours[2],
    customer_name: "Mike Davis",
    customer_email: "mike.davis@example.com",
    customer_phone: "+1122334455",
    number_of_people: 2,
    reservation_date: Date.today + 5.days,
    status: "pending"
  },
  {
    boat_tour: tours[3],
    customer_name: "Emily Brown",
    customer_email: "emily.brown@example.com",
    customer_phone: "+1555666777",
    number_of_people: 3,
    reservation_date: Date.today + 10.days,
    status: "confirmed"
  }
])

puts "Created #{Reservation.count} reservations"
puts "Seed data successfully created!"
