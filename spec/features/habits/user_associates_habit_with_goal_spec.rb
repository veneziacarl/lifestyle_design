require 'rails_helper'

feature 'user can add a goal to habit on habit creation', focus: true, js: true do
  let! (:schedule) { FactoryGirl.create(:schedule) }

  before (:each) do
    user_sign_in(schedule.habit.goal.user)
    visit root_path
  end

  scenario 'navigates to habit index page' do
    expect(page).to have_content(schedule.habit.title)
  end

  scenario 'clicks link to open new habit form' do
    click_on 'Create New'
    expect(page).to have_content('This is filler text in the dialog popover')
  end

  scenario 'clicks link to open new habit form' do
    click_on 'Create New'
    expect(page).to have_content('This is filler text in the dialog popover')
  end
end
