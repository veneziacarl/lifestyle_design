class Goal < ActiveRecord::Base
  belongs_to :user
  has_many :habits

  validates :title, presence: true
  validates :active, inclusion: { in: [true, false] }
end
