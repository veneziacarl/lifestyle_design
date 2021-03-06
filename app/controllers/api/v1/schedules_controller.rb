class Api::V1::SchedulesController < Api::V1::BaseController
  before_action :authenticate_user!

  def show
  end

  def index
    schedules = Schedule.where(status: "do").where("date < ?", (Date.today + 7.days)).order(id: :desc)
    render(
      json: ActiveModel::ArraySerializer.new(
        schedules,
        each_serializer: Api::V1::ScheduleSerializer,
        root: 'schedules'
      )
    )
  end

  def create
  end

  def destroy
    schedule = Schedule.find(params[:id])
    if schedule.repeat
      create_next_schedule(schedule)
    end
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
    if schedule.repeat
      create_next_schedule(schedule)
    end
    schedule.status = "completed"
    updated_schedule = update_info(schedule, schedule_params)
    render(json: Api::V1::ScheduleSerializer.new(updated_schedule))
  end

  def missed
    schedule = Schedule.find(params[:id])
    if schedule.repeat
      create_next_schedule(schedule)
    end
    schedule.status = "missed"
    updated_schedule = update_info(schedule, schedule_params)
    render(json: Api::V1::ScheduleSerializer.new(updated_schedule))
  end

  def stats_today
    day_stats = Schedule.find_day_stats
    week_stats = Schedule.week_completion_rates
    stats = [day_stats, week_stats.to_a]
    render json: stats
  end

  private

  def schedule_params
    params.permit(:id, :note, :date, :frequency, :status, :repeat, :goal)
  end

  def to_boolean(str)
    str == 'true'
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

  def create_next_schedule(current_schedule)
    new_schedule = Schedule.new(
      date: add_days(current_schedule.date, 7), status: current_schedule.status,
      repeat: current_schedule.repeat, frequency: current_schedule.frequency,
      habit: current_schedule.habit
    )
    if new_schedule.save
      return new_schedule
    else
      return new_schedule.errors
    end
  end

  def add_days(current_date, days)
    current_date + days.days
  end
end
