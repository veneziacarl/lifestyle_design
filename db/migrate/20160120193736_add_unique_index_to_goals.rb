class AddUniqueIndexToGoals < ActiveRecord::Migration
  def change
    add_index :goals, :title, :unique => true
  end
end
