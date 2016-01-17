require 'rails_helper'

feature 'create goals', %{
  As a User,
  I want to be able to see an index of my goals,
  So that I can get a high-level view of my ambitions.
} do

  let! (:user) { FactoryGirl.create(:user) }
  let! (:goal) { FactoryGirl.create(:goal, user: user) }

  scenario 'logged out user cannot navigate to manager, new, or show page' do
    denied_access_message = 'You need to sign in or sign up before continuing.'

    visit new_goal_path
    expect(page).to have_content(denied_access_message)

    visit goals_path
    expect(page).to have_content(denied_access_message)

    visit goal_path(goal)
    expect(page).to have_content(denied_access_message)
  end
end
