require 'rails_helper'

feature 'see goals details page', %{
  As a User,
  I want to be able to see the details of a specific goal,
  So that I can understand what exactly it is.
} do

  # Acceptance Criteria
  # [x] navigates to manager page and clicks on a goal
  # [x] Sees goal attributes if provided at creation

  let! (:user) { FactoryGirl.create(:user) }
  let! (:goal) { FactoryGirl.create(:goal, user: user) }

  before(:each) do
    user_sign_in(user)
  end

  scenario "sees the details" do
    visit goals_path
    click_link('See more details')

    expect(page).to have_content(goal.title)
    expect(page).to have_content(goal.description)
    expect(page).to have_content(goal.active)

    expect(page).to have_content("Habits that build to this goal:")
    expect(page).to have_content("No habits yet.")
  end

  scenario "navigates back to goals index page" do
    visit goal_path(goal)
    click_link("Back to Goals Index")

    expect(current_path).to eq(goals_path)
    expect(page).to have_content(goal.title)
  end
end
