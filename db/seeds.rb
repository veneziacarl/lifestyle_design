require 'factory_girl_rails'

user = FactoryGirl.create(:user, email: 'login@login.com')
goals = FactoryGirl.create_list(:goal, 5, user: user)
habits = FactoryGirl.create_list(:habit, 5, goal: goals[1])
FactoryGirl.create_list(:schedule, 5, habit: habits[0])
FactoryGirl.create_list(:schedule, 5, habit: habits[2])
