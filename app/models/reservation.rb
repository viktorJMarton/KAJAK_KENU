class Reservation < ApplicationRecord
  # Associations
  belongs_to :boat_tour

  # Constants
  VALID_STATUSES = %w[pending confirmed cancelled].freeze

  # Validations
  validates :customer_name, presence: true, length: { minimum: 2, maximum: 100 }
  validates :customer_email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :customer_phone, presence: true, format: { with: /\A\+?[\d\s\-()]+\z/ }
  validates :number_of_people, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :reservation_date, presence: true
  validates :status, presence: true, inclusion: { in: VALID_STATUSES }
  validate :reservation_date_must_be_future
  validate :reservation_date_must_be_within_tour_availability
  validate :number_of_people_within_capacity

  # Callbacks
  before_validation :set_default_status, on: :create

  # Scopes
  scope :pending, -> { where(status: 'pending') }
  scope :confirmed, -> { where(status: 'confirmed') }
  scope :cancelled, -> { where(status: 'cancelled') }
  scope :upcoming, -> { where('reservation_date >= ?', Date.today) }
  scope :ordered_by_date, -> { order(:reservation_date) }

  # Instance methods
  def confirm!
    update(status: 'confirmed')
  end

  def cancel!
    update(status: 'cancelled')
  end

  def pending?
    status == 'pending'
  end

  def confirmed?
    status == 'confirmed'
  end

  def cancelled?
    status == 'cancelled'
  end

  private

  def set_default_status
    self.status ||= 'pending'
  end

  def reservation_date_must_be_future
    return unless reservation_date

    if reservation_date < Date.today
      errors.add(:reservation_date, 'must be in the future')
    end
  end

  def reservation_date_must_be_within_tour_availability
    return unless reservation_date && boat_tour

    unless boat_tour.available_on?(reservation_date)
      errors.add(:reservation_date, 'must be within tour availability period')
    end
  end

  def number_of_people_within_capacity
    return unless number_of_people && boat_tour

    unless boat_tour.has_capacity_for?(number_of_people)
      errors.add(:number_of_people, "cannot exceed tour capacity of #{boat_tour.capacity}")
    end
  end
end
