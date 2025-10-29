Rails.application.routes.draw do
  # Root path
  root "boat_tours#index"

  # RESTful routes for boat tours
  resources :boat_tours, only: [:index, :show] do
    resources :reservations, only: [:new, :create]
  end

  # Admin namespace for managing reservations
  namespace :admin do
    resources :reservations, only: [:index] do
      member do
        patch :confirm
        patch :cancel
      end
    end
  end

  # Health check endpoint
  get "up" => "rails/health#show", as: :rails_health_check
end
