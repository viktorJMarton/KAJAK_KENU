class BoatTour < ApplicationRecord
  # Associations
  has_many :reservations, dependent: :destroy

  # Validations
  validates :name, presence: true, length: { minimum: 3, maximum: 100 }
  validates :description, presence: true, length: { minimum: 10, maximum: 1000 }
  validates :duration, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :capacity, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :price, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :available_from, presence: true
  validates :available_to, presence: true
  validate :available_to_after_available_from

  # Scopes
  scope :available, -> { where('available_to >= ?', Date.today) }
  scope :ordered_by_date, -> { order(:available_from) }

  # Instance methods
  def available?
    available_to >= Date.today
  end

  def available_on?(date)
    date >= available_from && date <= available_to
  end

  def has_capacity_for?(number_of_people)
    number_of_people <= capacity
  end

  private

  def available_to_after_available_from
    return unless available_from && available_to

    if available_to < available_from
      errors.add(:available_to, 'must be after available from date')
    end
  end
end
