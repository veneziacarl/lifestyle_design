class Api::V1::HabitSerializer < Api::V1::BaseSerializer
  attributes :id, :title, :description, :time_type
end
