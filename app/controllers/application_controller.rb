class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :configure_devise_permitted_parameters, if: :devise_controller?

  protected

  def configure_devise_permitted_parameters
    registration_params = [
      :first_name, :last_name, :email, :password,
      :password_confirmation
    ]
    
    if params[:action] == 'update'
      update_params(registration_params)
    elsif params[:action] == 'create'
      create_params(registration_params)
    end
  end

  def update_params(registration_params)
    devise_parameter_sanitizer.for(:account_update) do |u|
      u.permit(registration_params << :current_password)
    end
  end

  def create_params(registration_params)
    devise_parameter_sanitizer.for(:sign_up) do |u|
      u.permit(registration_params)
    end
  end
end
