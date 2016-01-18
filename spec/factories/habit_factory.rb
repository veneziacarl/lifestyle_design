require 'factory_girl_rails'

FactoryGirl.define do
  factory :habit do
    sequence(:title) { |n| "Habit #{n}" }
    sequence(:description) { |n| "Habit Description #{n}" }
    active true
    association :goal
  end
end
