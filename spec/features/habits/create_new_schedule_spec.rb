require 'rails_helper'

feature 'create new habit with schedules and tie it to a goal', js: true do
  let! (:schedule) { FactoryGirl.create(:schedule) }

  before (:each) do
    user_sign_in(schedule.habit.goal.user)
    visit root_path
  end

  scenario 'navigates to schedule index page' do
    expect(page).to have_content(schedule.habit.title)
  end

  scenario 'open new habit form and submit form to see resource on index' do
    click_on 'Create New'

    expect(page).to have_content('This is filler text in the dialog popover')

    fill_in 'title', with: 'this is a title'
    fill_in 'description', with: 'this is a description'
  end
end
