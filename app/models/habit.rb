class Habit < ActiveRecord::Base
  belongs_to :goal
  has_many :schedules
  accepts_nested_attributes_for :schedules

  validates :goal, presence: true
  validates :title, presence: true
  validates :active, inclusion: { in: [true, false] }

  def self.week_completion_rates
  #   today = Date.today.utc
  #   monday = today.beginning_of_week
  #   sunday = today.end_of_week
  #   habits = Habit.where('date >= ? AND date <= ?', monday, sunday)
  #   sum_habits = 0
  #   completions = []
  #   habits.each do |habit|
  #     habit_info = { 1: info: habit, completed: 0 }
  #     habit.schedules.each do |schedule|
  #       if schedule.status == 'completed'
  #       end
  #     end
  #     completions << habit_info
  #   end
  #   completions
  end
end
