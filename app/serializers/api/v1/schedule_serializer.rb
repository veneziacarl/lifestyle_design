class Api::V1::ScheduleSerializer < Api::V1::BaseSerializer
  attributes :id, :habit, :date, :status, :frequency, :repeat, :created_at, :updated_at
end
