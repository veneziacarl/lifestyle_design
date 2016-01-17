require 'rails_helper'

feature 'see goals index page', %{
  As a User,
  I want to be able to see an index of my goals,
  So that I can get a high-level view of my ambitions.
} do

  # Acceptance Criteria
  # [x] I should see an index of all goals titles on the index page, sorted by newest first
  # [x] navigates to index page from habit page
  # [x] sees goals displayed only once per goal

  let!(:user) { FactoryGirl.create(:user) }
  let!(:goals) { FactoryGirl.create_list(:goal, 11, user: user) }

  before(:each) do
    user_sign_in(user)
  end

  scenario 'user navigates to goals index from habit page' do
    click_link 'Goals'

    expect(page).to have_content('Your Goals:')
  end

  scenario "user sees all goals on index" do
    visit goals_path

    goals.each do |goal|
      expect(page).to have_content(goal.title, count: 1)
    end
    expect(goals.last.title).to appear_before(goals.first.title)
  end
end
