# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

habits_list = [
  [ "Brush Teeth", "keep them clean", "daily" ],
  [ "Make Bed", "keep it tidy", "monthly" ],
  [ "<= 1 hour of TV", "limit yourself", "yearly" ],
  [ "Wake up by 7am", "start the day off right", "daily" ]
]

habits_list.each do |habit|
  Habit.create( {title: habit[0], description: habit[1], time_type: habit[2]} )
end
