class CreateSchedules < ActiveRecord::Migration
  def change
    create_table :schedules do |t|
      t.belongs_to :habit, index: true, null: false
      t.datetime :date, index: true, null: false
      t.string :status, null: false, default: "do"
      t.string :type, null: false
      t.boolean :repeat, null: false, default: true

      t.timestamps null: false
    end
  end
end
