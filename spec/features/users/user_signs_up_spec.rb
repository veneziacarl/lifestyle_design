require 'rails_helper'

feature 'user signs up', %{
  As an unauthenticated user
  I want to sign up
  So that I can participate in the website
} do

  # ACCEPTANCE CRITERIA
  # [x] I must specify a valid email address
  # [x] I must specify a password and confirm that password
  # [x] If I do not give valid information, I get an error message
  # [x] If I specify valid information, register my account and authenticate

  scenario 'user specifies valid and required information' do
    visit root_path

    expect(page).to have_content('Sign Up')
    expect(page).to have_content('Sign In')

    click_link 'Sign Up'
    fill_in 'First Name', with: 'firstname'
    fill_in 'Last Name', with: 'lastname'
    fill_in 'Email', with: 'fake@email.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'password'
    click_button 'Sign up'

    expect(page).to have_content('Welcome! Let\'s get started.', count: 1)
    expect(page).to have_content('Sign Out')
    expect(page).to_not have_content('Sign Up')
    expect(page).to_not have_content('Sign In')
  end

  scenario 'required information is not supplied' do
    visit new_user_registration_path
    click_button 'Sign up'

    expect(page).to have_content("can't be blank", count: 4)
    expect(page).to_not have_content('Sign Out')
  end

  scenario 'password does not match confirmation' do
    visit new_user_registration_path

    fill_in 'First Name', with: 'firstname'
    fill_in 'Last Name', with: 'lastname'
    fill_in 'Email', with: 'fake@email.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'anotherpassword'
    click_button 'Sign up'

    expect(page).to have_content("doesn't match")
    expect(page).to_not have_content('Sign Out')
  end
end
