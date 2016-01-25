class Schedule < ActiveRecord::Base
  belongs_to :habit

  validates :habit, presence: true
  validates :status, presence: true,
    inclusion: { in: ["do", "dont", "completed", "missed"] }
  validates :frequency, presence: true,
    inclusion: { in: ["day"] }
  validates :repeat, inclusion: { in: [true, false] }
  validates :date, presence: true
  validate :date_is_valid_datetime

  def date_is_valid_datetime
    errors.add(:date, 'must be a valid datetime') unless date.is_a?(ActiveSupport::TimeWithZone)
  end

  def self.find_day_stats
    today = DateTime.now.utc.midnight
    day_stats = {
      habit_count: 0, do_count: 0, missed_count: 0, completed_count: 0, percent_complete: 0.0
    }
    @schedules = Schedule.where("date >= ?", today)
    @schedules.each do |schedule|
      if schedule.date.midnight == today
        day_stats[:habit_count] += 1
        day_stats[:do_count] += 1 if schedule.status == 'do'
        day_stats[:missed_count] += 1 if schedule.status == 'missed'
        day_stats[:completed_count] += 1 if schedule.status == 'completed'
      end
    end
    day_stats[:percent_complete] = sprintf "%.2f", ( day_stats[:completed_count].to_f / day_stats[:habit_count].to_f )
    day_stats
  end

  def self.week_completion_rates
    today = DateTime.now.utc.beginning_of_day
    monday = today.beginning_of_week
    sunday = today.end_of_week
    week = (monday..sunday).to_a
    stats = {
      1=> 0, 2=> 0, 3=> 0, 4=> 0, 5=> 0, 6=> 0, 7=> 0
    }
    week.each_with_index do |day, i|
      schedules = Schedule.where("date >= ? AND status = ?", day, 'completed')
      schedules.each do |schedule|
        if schedule.date.midnight == day
          stats[i+1] += 1
        end
      end
    end
    stats
  end
end
