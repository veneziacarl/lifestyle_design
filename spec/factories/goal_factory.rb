require 'factory_girl_rails'

FactoryGirl.define do
  factory :goal do
    sequence(:title) { |n| "Goal #{n}" }
    sequence(:description) { |n| "Goal Description #{n}" }
    active true
    color '#00bcd4'
    association :user
  end
end
