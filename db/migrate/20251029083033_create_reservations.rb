class CreateReservations < ActiveRecord::Migration[7.1]
  def change
    create_table :reservations do |t|
      t.references :boat_tour, null: false, foreign_key: true
      t.string :customer_name
      t.string :customer_email
      t.string :customer_phone
      t.integer :number_of_people
      t.date :reservation_date
      t.string :status

      t.timestamps
    end
  end
end
