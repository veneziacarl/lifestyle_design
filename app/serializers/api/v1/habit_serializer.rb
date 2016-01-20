class Api::V1::HabitSerializer < Api::V1::BaseSerializer
  attributes :id, :title, :description, :created_at, :updated_at, :goal, :active
end
