class AddColorToGoals < ActiveRecord::Migration
  def change
    add_column :goals, :color, :string, null: false
  end
end
