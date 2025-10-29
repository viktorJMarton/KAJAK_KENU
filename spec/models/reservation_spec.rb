require 'rails_helper'

RSpec.describe Reservation, type: :model do
  describe 'associations' do
    it { should belong_to(:boat_tour) }
  end

  describe 'validations' do
    it { should validate_presence_of(:customer_name) }
    it { should validate_presence_of(:customer_email) }
    it { should validate_presence_of(:customer_phone) }
    it { should validate_presence_of(:number_of_people) }
    it { should validate_presence_of(:reservation_date) }

    it { should validate_length_of(:customer_name).is_at_least(2).is_at_most(100) }
    it { should validate_numericality_of(:number_of_people).only_integer.is_greater_than(0) }
    it { should validate_inclusion_of(:status).in_array(%w[pending confirmed cancelled]) }
  end

  describe '#confirm!' do
    it 'changes status to confirmed' do
      reservation = create(:reservation, status: 'pending')
      reservation.confirm!
      expect(reservation.status).to eq('confirmed')
    end
  end

  describe '#cancel!' do
    it 'changes status to cancelled' do
      reservation = create(:reservation, status: 'pending')
      reservation.cancel!
      expect(reservation.status).to eq('cancelled')
    end
  end

  describe 'status predicates' do
    it '#pending? returns true when status is pending' do
      reservation = build(:reservation, status: 'pending')
      expect(reservation.pending?).to be true
    end

    it '#confirmed? returns true when status is confirmed' do
      reservation = build(:reservation, status: 'confirmed')
      expect(reservation.confirmed?).to be true
    end

    it '#cancelled? returns true when status is cancelled' do
      reservation = build(:reservation, status: 'cancelled')
      expect(reservation.cancelled?).to be true
    end
  end
end
