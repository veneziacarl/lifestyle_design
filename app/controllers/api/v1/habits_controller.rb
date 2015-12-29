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
  
end
