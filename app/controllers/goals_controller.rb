class GoalsController < ApplicationController
  before_action :authenticate_user!

  def index
    @goal = Goal.new
    @goals = Goal.order(id: :desc)
  end

  def show
    @goal = Goal.find(params[:id])
    @habits = @goal.habits
  end

  def new
  end

  def create
    @goal = Goal.new(goal_params)
    @goal.user = current_user
    if @goal.save
      redirect_to goal_path(@goal),
        notice: 'New Goal Created Successfully!'
    else
      flash.now[:error] = "Form submission error"
      render :new
    end
  end

  private

  def goal_params
    params.require(:goal).permit(:id, :title, :description, :active, :color)
  end
end
