class Api::V1::HabitsController < Api::V1::BaseController
  def show
    habit = Habit.find(params[:id])

    render(json: Api::V1::HabitSerializer.new(habit).to_json)
  end

  def index
    habits = Habit.all

    render(
      json: ActiveModel::ArraySerializer.new(
        habits,
        each_serializer: Api::V1::HabitSerializer,
        root: 'habits',
      )
    )
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

  end


  private

  def habit_params
    params.permit(:title, :description, :time_type)
  end

end
