require 'rails_helper'

feature 'create goals', %{
  As a User,
  I want to be able to create goals,
  So that I can level-up in life.
} do

  # ACCEPTANCE CRITERIA
  # [ ] navigates to manager page and can create a new goal with title and optional description
  # [ ] upon successful creation, sees goal on manager page
  # [ ] upon errant submission in creation, sees errors displayed and goal is not created

  let! (:user) { FactoryGirl.create(:user) }

  before(:each) do
    user_sign_in(user)
  end

  scenario 'user navigates to manager page' do
    visit root_path
    click_link 'Goals'

    expect(page).to have_content('You have no goals to display.')
    expect(page).to have_content('Your Goals:')

    click_link 'Create New Goal'

    expect(page).to have_css('form')
  end
end
