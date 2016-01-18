class Habit < ActiveRecord::Base
  belongs_to :goal
  has_many :schedules

  validates :goal, presence: true
  validates :title, presence: true
  validates :active, presence: true, inclusion: { in: [true, false] }
end
