class Api::V1::SchedulesController < Api::V1::BaseController
  def show
  end

  def index
    schedules = Schedule.where(status: "do").order(id: :desc)
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
        date: schedule_params[:date], note: schedule_params[:note],
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
    schedule = Schedule.find(params[:id])
    Schedule.destroy(schedule.id)
    render(json: Api::V1::ScheduleSerializer.new(schedule))
  end

  def update
    schedule = Schedule.find(params[:id])
    updated_schedule = update_info(schedule, schedule_params)
    render(json: Api::V1::ScheduleSerializer.new(updated_schedule))
  end

  def completed
    schedule = Schedule.find(params[:id])
    schedule.status = "completed"
    updated_schedule = update_info(schedule, schedule_params)
    render(json: Api::V1::ScheduleSerializer.new(updated_schedule))
  end

  def missed
    schedule = Schedule.find(params[:id])
    schedule.status = "missed"
    updated_schedule = update_info(schedule, schedule_params)
    render(json: Api::V1::ScheduleSerializer.new(updated_schedule))
  end

  private

  def to_boolean(str)
    str == 'true'
  end

  def schedule_params
    params.permit(:id, :date, :status, :repeat, :frequency, :title, :description, :goal, :note, :updatedStatus)
  end

  def update_info(schedule, info)
    if schedule.update(info)
      flash[:notice] = "Schedule Successfully Updated"
      flash[:color]= "valid"
    else
      flash[:notice] = "Form is invalid"
      flash[:color]= "invalid"
    end
    schedule
  end
end
