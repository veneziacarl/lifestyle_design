class Api::V1::GoalsController < Api::V1::BaseController
  def show
  end

  def index
    @goals = Goal.order(id: :desc)
    render json: ActiveModel::ArraySerializer.new(
      @goals,
      each_serializer: Api::V1::GoalSerializer,
      root: 'goals'
    )
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
