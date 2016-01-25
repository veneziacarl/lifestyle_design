class Habit < ActiveRecord::Base
  belongs_to :goal
  has_many :schedules
  accepts_nested_attributes_for :schedules

  validates :goal, presence: true
  validates :title, presence: true
  validates :active, inclusion: { in: [true, false] }

  def self.most_missed
    habits = Habit.all
    highest_missed, second_missed, most_missed = 0, 0, {1 => '', 2 => ''}
    habits.each do |habit|
      miss_count = 0
      habit.schedules.each do |schedule|
        miss_count += 1 if schedule.status == 'missed'
      end
      if miss_count > highest_missed
        most_missed['1'] = {habit: habit.title, miss_count: miss_count}
        highest_missed = miss_count
      elsif miss_count > second_missed
        most_missed['2'] = {habit: habit.title, miss_count: miss_count}
        second_missed = miss_count
      end
    end
    most_missed
  end
end
