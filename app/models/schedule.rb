class Schedule < ActiveRecord::Base
  belongs_to :habit

  validates :habit, presence: true
  validates :status, presence: true,
    inclusion: { in: ["do", "dont", "completed", "missed"] }
  validates :type, presence: true,
    inclusion: { in: ["day"] }
  validates :repeat, presence: true, inclusion: { in: [true, false] }
  validates :date, presence: true
  validate :date_is_valid_datetime

  def date_is_valid_datetime
    errors.add(:date, 'must be a valid datetime') unless date.is_a?(ActiveSupport::TimeWithZone)
  end
end
