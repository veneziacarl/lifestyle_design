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
    habit = Habit.new(habit_params)
    if habit.save
      flash[:notice] = "Habit Successfully Created"
      flash[:color]= "valid"
    else
      flash[:notice] = "Form is invalid"
      flash[:color]= "invalid"
    end
    render json: habit
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
    params.permit(:id, :title, :description, :time_type)
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
end
