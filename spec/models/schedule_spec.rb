require 'rails_helper'

RSpec.describe Schedule, type: :model do
  it { should have_valid(:date).when('2016-01-18T20:53:45.829Z') }
  it { should_not have_valid(:date).when(nil, '', '12/20/1991', 'apple') }

  it { should have_valid(:status).when("do", "dont", "missed", "completed") }
  it { should_not have_valid(:status).when("", nil, 1) }

  it { should have_valid(:frequency).when("day") }
  it { should_not have_valid(:frequency).when("d", "", nil, 1) }

  it 'correctly finds the current weeks completion rates' do
    
  end
end
