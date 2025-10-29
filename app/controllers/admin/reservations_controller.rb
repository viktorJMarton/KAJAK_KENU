class Admin::ReservationsController < ApplicationController
  before_action :set_reservation, only: [:confirm, :cancel]

  def index
    @reservations = Reservation.includes(:boat_tour).ordered_by_date
    @pending_reservations = @reservations.pending
    @confirmed_reservations = @reservations.confirmed
    @cancelled_reservations = @reservations.cancelled
  end

  def confirm
    if @reservation.confirm!
      redirect_to admin_reservations_path, notice: 'Reservation confirmed successfully'
    else
      redirect_to admin_reservations_path, alert: 'Failed to confirm reservation'
    end
  end

  def cancel
    if @reservation.cancel!
      redirect_to admin_reservations_path, notice: 'Reservation cancelled successfully'
    else
      redirect_to admin_reservations_path, alert: 'Failed to cancel reservation'
    end
  end

  private

  def set_reservation
    @reservation = Reservation.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    redirect_to admin_reservations_path, alert: 'Reservation not found'
  end
end
