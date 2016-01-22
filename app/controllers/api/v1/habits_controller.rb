class Api::V1::HabitsController < Api::V1::BaseController
  before_action :authenticate_user!

  def show
    habit = Habit.find(params[:id])
    render json: habit
  end

  def index
    habits = Habit.order(id: :desc)
    render json: habits
  end

  def create
    @goal = Goal.where(title: habit_params[:schedules_attributes]['0'][:goal]).first
    @habit = Habit.new(
      title: habit_params[:title],
      description: habit_params[:description], goal: @goal
    )
    if @habit.save
      @schedules = []
      habit_params[:schedules_attributes].each do |key, value|
        schedule = Schedule.new(
          date: value[:date], note: value[:note],
          status: value[:status], repeat: to_boolean(value[:repeat]),
          frequency: value[:frequency], habit: @habit
        )
        @schedules << schedule
      end
      if schedules_saved?(@schedules)
        render(
          json: ActiveModel::ArraySerializer.new(
            @schedules,
            each_serializer: Api::V1::ScheduleSerializer,
            root: 'schedules'
          )
        )
      else
        render_unavailable
      end
    else
      render_unavailable
    end
  end

  def destroy
    habit = Habit.find(params[:id])
    Habit.destroy(habit.id)
    render json: habit
  end

  def update
    habit = Habit.find(params[:id])
    updated_habit = update_info(habit, habit_params)
    render json: updated_habit
  end


  private

  def habit_params
    params.permit(:id, :title, :description, schedules_attributes: [:date, :frequency, :status, :repeat, :goal, :note])
  end

  def to_boolean(str)
    str == 'true'
  end

  def update_info(habit, info)
    if habit.update(info)
      flash[:notice] = "Habit Successfully Updated"
      flash[:color]= "valid"
    else
      flash[:notice] = "Form is invalid"
      flash[:color]= "invalid"
    end
    habit
  end

  def schedules_saved?(schedules)
    saved_schedules = []
    schedules.each do |schedule|
      if schedule.save
        saved_schedules << schedule
      else
        saved_schedules = false
      end
    end
    saved_schedules
  end
end
