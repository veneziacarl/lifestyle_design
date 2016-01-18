class Habit < ActiveRecord::Base
  belongs_to :goal
  has_many :schedules

  validates :title, presence: true
  validates :goal, presence: true
  validates :active, presence: true, inclusion: { in: [true, false] }
end
