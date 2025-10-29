class BoatToursController < ApplicationController
  before_action :set_boat_tour, only: [:show]

  def index
    @boat_tours = BoatTour.available.ordered_by_date
  end

  def show
    @reservation = Reservation.new
  end

  private

  def set_boat_tour
    @boat_tour = BoatTour.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    redirect_to boat_tours_path, alert: 'Boat tour not found'
  end
end
