require 'factory_girl_rails'

FactoryGirl.define do
  factory :schedule do
    frequency "day"
    status "do"
    repeat true
    date { Time.zone.now }
    association :habit
  end
end
