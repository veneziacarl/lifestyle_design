require 'rails_helper'

feature 'create goals', %{
  As a User,
  I want to be able to create goals,
  So that I can level-up in life.
} do

  # ACCEPTANCE CRITERIA
  # [x] If I am logged in, I can click a button on the goals index to
  #     add a new goal and be brought to a form on the 'new' page
  # [x] If I am logged in, and I fill out the form incorrectly,
  #     I am given an error and the goal does not persist
  # [x] On successful submission, the goal appears on the index
  #     and the user is brought to the show page

  let! (:user) { FactoryGirl.create(:user) }

  before(:each) do
    user_sign_in(user)
  end

  scenario 'logged in user navigates to manager page' do
    click_link 'Goals'

    expect(page).to have_content('You have no goals to display.')
    expect(page).to have_content('Your Goals:')

    click_link 'Create New Goal'

    expect(page).to have_css('form')
  end

  scenario 'logged in user adds new goal, is brought to goal show page, sees goal on index' do
    visit new_goal_path
    fill_in 'Title', with: 'be healthy'
    fill_in 'Description', with: 'do the little things to make it work'
    click_button 'Add Goal'

    expect(page).to have_content('New Goal Created Successfully!')
    expect(page).to have_content('be healthy')
    expect(page).to have_content('do the little things to make it work')

    visit goals_path
    expect(page).to have_content('be healthy')
  end

  scenario 'logged in user incorrectly fills out form' do
    description = 'this should not work since title is required'

    visit new_goal_path
    fill_in 'Description', with: description
    click_button 'Add Goal'

    expect(page).to have_content('Form submission error')
    expect(page).to have_content('1 error: please correct the following and try again.')
    expect(page).to have_content('Title can\'t be blank')
    expect(find_field('Description').value).to eq(
      description
    )

    visit goals_path
    expect(page).to_not have_content(description)
  end
end
