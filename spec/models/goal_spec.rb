require 'rails_helper'

RSpec.describe Goal, type: :model do
  it { should have_valid(:title).when('title', 'aNother TitlE') }
  it { should_not have_valid(:title).when(nil, '') }

  it { should have_valid(:description).when('description', nil, '') }
end
