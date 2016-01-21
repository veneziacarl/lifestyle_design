class AddNotesToSchedule < ActiveRecord::Migration
  def change
    add_column :schedules, :note, :text
  end
end
