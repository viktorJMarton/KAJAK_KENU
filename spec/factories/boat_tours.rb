FactoryBot.define do
  factory :boat_tour do
    name { "Kayak River Adventure" }
    description { "Experience the thrill of kayaking through scenic river landscapes with expert guides." }
    duration { 120 }
    capacity { 10 }
    price { 49.99 }
    available_from { Date.today }
    available_to { Date.today + 30.days }
  end
end
