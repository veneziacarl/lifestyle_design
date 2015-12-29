class CreateHabits < ActiveRecord::Migration
  def change
    create_table :habits do |t|
      t.string "title",       null: false
      t.string "description", null: false
      t.string "time_type", null: false

      t.timestamps
    end
  end
end
