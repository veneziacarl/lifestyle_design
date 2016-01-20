class AddColumnActiveHabits < ActiveRecord::Migration
  def change
    add_column :habits, :active, :boolean, null: false, default: true
  end
end
