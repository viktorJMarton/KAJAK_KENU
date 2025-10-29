require 'rails_helper'

RSpec.describe BoatTour, type: :model do
  describe 'associations' do
    it { should have_many(:reservations).dependent(:destroy) }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:duration) }
    it { should validate_presence_of(:capacity) }
    it { should validate_presence_of(:price) }
    it { should validate_presence_of(:available_from) }
    it { should validate_presence_of(:available_to) }

    it { should validate_length_of(:name).is_at_least(3).is_at_most(100) }
    it { should validate_length_of(:description).is_at_least(10).is_at_most(1000) }

    it { should validate_numericality_of(:duration).only_integer.is_greater_than(0) }
    it { should validate_numericality_of(:capacity).only_integer.is_greater_than(0) }
    it { should validate_numericality_of(:price).is_greater_than_or_equal_to(0) }
  end

  describe '#available?' do
    it 'returns true when available_to is in the future' do
      tour = build(:boat_tour, available_to: Date.tomorrow)
      expect(tour.available?).to be true
    end

    it 'returns false when available_to is in the past' do
      tour = build(:boat_tour, available_to: Date.yesterday)
      expect(tour.available?).to be false
    end
  end

  describe '#available_on?' do
    let(:tour) { build(:boat_tour, available_from: Date.today, available_to: Date.today + 7.days) }

    it 'returns true when date is within availability period' do
      expect(tour.available_on?(Date.today + 3.days)).to be true
    end

    it 'returns false when date is before availability period' do
      expect(tour.available_on?(Date.yesterday)).to be false
    end

    it 'returns false when date is after availability period' do
      expect(tour.available_on?(Date.today + 8.days)).to be false
    end
  end

  describe '#has_capacity_for?' do
    let(:tour) { build(:boat_tour, capacity: 10) }

    it 'returns true when number of people is within capacity' do
      expect(tour.has_capacity_for?(5)).to be true
    end

    it 'returns false when number of people exceeds capacity' do
      expect(tour.has_capacity_for?(15)).to be false
    end
  end
end
