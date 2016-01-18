require 'rails_helper'

RSpec.describe Habit, type: :model do
  it { should have_valid(:title).when('title', 'aNother TitlE') }
  it { should_not have_valid(:title).when(nil, '') }

  it { should have_valid(:description).when('description', nil, '') }

  # it { should have_valid(:active).when(true, false) }
  # it { should_not have_valid(:active).when('no', 1, nil) }

  it 'returns true if it has a schedule on the current day' do
    
  end
end
