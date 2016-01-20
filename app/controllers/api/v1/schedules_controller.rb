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
    @habit = Habit.new(habit_params)
    if @habit.save
      @schedule = Schedule.new(schedule_params, habit: @habit)
      binding.pry
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

  def schedule_params
    params.permit(:id, :date, :status, :type, :repeat, :frequency)
  end

  def habit_params
    params.permit(:title, :description)
  end
end
