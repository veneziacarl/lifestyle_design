class HabitsController < ApplicationController

  def index
  end

  private

  def habit_params
    params.require(:habit).permit(:title, :description, :time_type)
  end
end
