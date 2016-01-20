class RenameColumnTypeOnSchedules < ActiveRecord::Migration
  def change
    rename_column :schedules, :type, :frequency
  end
end
