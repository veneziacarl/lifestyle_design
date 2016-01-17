class AlterHabits < ActiveRecord::Migration
  def change
    add_reference :habits, :goal, index: true, null: false
    change_column_null :habits, :description, true
    change_column_null :habits, :time_type, true
    remove_column :habits, :time_type, :string
  end
end
