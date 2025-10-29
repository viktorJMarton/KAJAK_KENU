FactoryBot.define do
  factory :reservation do
    association :boat_tour
    customer_name { "John Doe" }
    customer_email { "john.doe@example.com" }
    customer_phone { "+1234567890" }
    number_of_people { 2 }
    reservation_date { Date.tomorrow }
    status { "pending" }
  end
end
