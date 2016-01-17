class Goal < ActiveRecord::Base
  belongs_to :user
  has_many :habits

  validates :title, presence: true
  validates :user, presence: true
  validates :active, presence: true, inclusion: { in: [true, false] }
end
