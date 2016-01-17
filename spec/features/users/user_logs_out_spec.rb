require 'rails_helper'

feature 'user signs in', %{
  As a user
  I want to sign out
  So that I can securely leave the site
} do

  # Acceptance Criteria:
  # - [x] if I am logged in, I can log out
  # - [x] if I am not logged in, there is no option to log out
  # - [x] if I sign out, I can sign back in

  let (:user) { FactoryGirl.create(:user) }

  scenario 'a signed-in user logs out' do
    user_sign_in(user)
    click_link 'Sign Out'

    expect(page).to have_content('Signed out successfully.')
    expect(page).to have_content('Sign In')
    expect(page).to_not have_content('Sign Out')
  end

  scenario 'a logged out user cannot log out' do
    visit root_path

    expect(page).to_not have_content('Sign Out')
  end

  scenario 'a user can sign out and then back in' do
    user_sign_in(user)
    click_link 'Sign Out'

    expect(page).to have_content('Signed out successfully.')
    expect(page).to have_content('Sign In')
    expect(page).to_not have_content('Sign Out')

    visit new_user_session_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log in'

    expect(page).to have_content('Welcome back!')
  end
end
