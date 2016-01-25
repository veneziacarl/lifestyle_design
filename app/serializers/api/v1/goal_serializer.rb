class Api::V1::GoalSerializer < Api::V1::BaseSerializer
  attributes :id, :title, :description, :created_at, :updated_at, :user, :active, :sum_today_schedules

  def sum_today_schedules
    sum = 0
    today = DateTime.now.utc.midnight
    object.habits.each do |habit|
      habit.schedules.each do |schedule|
        if schedule.date.midnight == today
          sum += 1
        end
      end
    end
    sum
  end
end
