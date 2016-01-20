class Api::V1::SchedulesController < Api::V1::BaseController
  def show
  end

  def index
    schedules = Schedule.order(id: :desc)
    render(
      json: ActiveModel::ArraySerializer.new(
        schedules,
        each_serializer: Api::V1::ScheduleSerializer,
        root: 'schedules',
      )
    )
  end

  def create
    binding.pry
  end

  def destroy
  end

  def update
  end

  private

  def schedule_params
    params.permit(:id, :date, :status, :type, :repeat, :title, :description, :dates, :frequency)
  end
end
