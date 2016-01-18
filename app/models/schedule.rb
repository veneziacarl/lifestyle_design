class Schedule < ActiveRecord:Base
  belongs_to :habit

  validates :habit, presence: true
  validates :status, presence: true
  validates :type, presence: true
  validates :repeat, presence: true, inclusion: { in: [true, false] }
  validates :date, presence: true
  validate :date_is_valid_datetime

  def date_is_valid_datetime
    errors.add(:date, 'must be a valid datetime') if ((DateTime.parse(date) rescue ArgumentError) == ArgumentError)
  end
end
