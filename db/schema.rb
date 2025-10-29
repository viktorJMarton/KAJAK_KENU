# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_10_29_083033) do
  create_table "boat_tours", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "duration"
    t.integer "capacity"
    t.decimal "price"
    t.date "available_from"
    t.date "available_to"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reservations", force: :cascade do |t|
    t.integer "boat_tour_id", null: false
    t.string "customer_name"
    t.string "customer_email"
    t.string "customer_phone"
    t.integer "number_of_people"
    t.date "reservation_date"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["boat_tour_id"], name: "index_reservations_on_boat_tour_id"
  end

  add_foreign_key "reservations", "boat_tours"
end
