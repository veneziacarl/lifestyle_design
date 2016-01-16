class GoalsController < ApplicationController

  def index
  end

  def show
  end

  private

  def goal_params
    params.permit(:id, :title, :description, :active, :user)
  end
end
