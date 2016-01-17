class CreateGoals < ActiveRecord::Migration
  def change
    create_table :goals do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.belongs_to :user, index: true, null: false
      t.boolean :active, null: false, default: true

      t.timestamps null: false
    end
  end
end
