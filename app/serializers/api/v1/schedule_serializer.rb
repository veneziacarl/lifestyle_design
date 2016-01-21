class Api::V1::ScheduleSerializer < Api::V1::BaseSerializer
  attributes :id, :habitInfo, :date, :status, :frequency, :repeat, :note, :created_at, :updated_at

  def habitInfo
    Api::V1::HabitSerializer.new(object.habit)
  end
end
