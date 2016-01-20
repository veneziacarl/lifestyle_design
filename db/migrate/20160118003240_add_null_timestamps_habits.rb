class AddNullTimestampsHabits < ActiveRecord::Migration
  def change
    change_column_null :habits, :updated_at, false
    change_column_null :habits, :created_at, false
  end
end
