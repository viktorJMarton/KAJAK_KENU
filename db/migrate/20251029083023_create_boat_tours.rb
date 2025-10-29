class CreateBoatTours < ActiveRecord::Migration[7.1]
  def change
    create_table :boat_tours do |t|
      t.string :name
      t.text :description
      t.integer :duration
      t.integer :capacity
      t.decimal :price
      t.date :available_from
      t.date :available_to

      t.timestamps
    end
  end
end
