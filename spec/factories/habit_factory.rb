require 'factory_girl_rails'

FactoryGirl.define do
  factory :habit do
    sequence(:title) { |n| "Goal #{n}" }
    sequence(:description) { |n| "Goal Description #{n}" }
    active true
    association :goal
  end
end
