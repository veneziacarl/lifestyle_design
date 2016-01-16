class Api::V1::GoalsController < Api::V1::BaseController
  def show
  end

  def index
  end

  def create
  end

  def destroy
  end

  def update
  end


  private

  def goal_params
    params.permit(:id, :title, :description, :active, :user)
  end
end
