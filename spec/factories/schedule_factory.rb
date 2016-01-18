require 'factory_girl_rails'

FactoryGirl.define do
  factory :schedule do
    type "day"
    status "do"
    repeat true
    date { Time.zone.now }
    association :habit
  end
end
