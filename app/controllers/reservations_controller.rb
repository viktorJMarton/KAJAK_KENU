class ReservationsController < ApplicationController
  before_action :set_boat_tour

  def new
    @reservation = @boat_tour.reservations.build
  end

  def create
    @reservation = @boat_tour.reservations.build(reservation_params)

    if @reservation.save
      redirect_to boat_tour_path(@boat_tour), notice: 'Reservation successfully created!'
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def set_boat_tour
    @boat_tour = BoatTour.find(params[:boat_tour_id])
  rescue ActiveRecord::RecordNotFound
    redirect_to boat_tours_path, alert: 'Boat tour not found'
  end

  def reservation_params
    params.require(:reservation).permit(
      :customer_name,
      :customer_email,
      :customer_phone,
      :number_of_people,
      :reservation_date
    )
  end
end
