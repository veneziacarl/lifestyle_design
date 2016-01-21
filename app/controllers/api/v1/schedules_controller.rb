class Api::V1::SchedulesController < Api::V1::BaseController
  def show
  end

  def index
    schedules = Schedule.order(id: :desc)
    render(
      json: ActiveModel::ArraySerializer.new(
        schedules,
        each_serializer: Api::V1::ScheduleSerializer,
        root: 'schedules'
      )
    )
  end

  def create
    @goal = Goal.where(title: schedule_params[:goal]).first
    @habit = Habit.new(
      title: schedule_params[:title],
      description: schedule_params[:description], goal: @goal
    )
    if @habit.save
      @schedule = Schedule.new(
        date: schedule_params[:date],
        status: schedule_params[:status], repeat: to_boolean(schedule_params[:repeat]),
        frequency: schedule_params[:frequency], habit: @habit
      )
      if @schedule.save
        render(json: Api::V1::ScheduleSerializer.new(@schedule))
      else
        render_unavailable
      end
    else
      render_unavailable
    end
  end

  def destroy
  end

  def update
  end

  private

  def to_boolean(str)
    str == 'true'
  end

  def schedule_params
    params.permit(:id, :date, :status, :repeat, :frequency, :title, :description, :goal)
  end
end
