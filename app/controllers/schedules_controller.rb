class SchedulesController < ApplicationController

  def index
  end

  private

  def schedule_params
    params.require(:schedule).permit(:id, :date, :status, :type, :repeat, :note)
  end
end
