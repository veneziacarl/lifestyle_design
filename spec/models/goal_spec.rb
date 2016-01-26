require 'rails_helper'

RSpec.describe Goal, type: :model do
  let (:goal) { FactoryGirl.create(:goal) }
  let (:habit) { FactoryGirl.create(:habit, goal: goal) }
  let! (:schedule) { FactoryGirl.create(:schedule, habit: habit) }
  let! (:schedule2) { FactoryGirl.create(:schedule, habit: habit) }

  it { should have_valid(:title).when('title', 'aNother TitlE') }
  it { should_not have_valid(:title).when(nil, '') }

  it { should have_valid(:description).when('description', nil, '') }

  it 'provides the date of its last updated schedule', skip: true do
    expect(schedule2.habit.recent_progress).to eq(schedule2.updated_at)
  end
end
