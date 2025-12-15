import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SEAT_PRICE = 1200;
const PREMIUM_EXTRA = 300;

const seatsData = [
  ['1A', '1B', '1C', '1D'],
  ['2A', '2B', '2C', '2D'],
  ['3A', '3B', '3C', '3D'],
  ['4A', '4B', '4C', '4D'],
  ['5A', '5B', '5C', '5D'],
];

const bookedSeats = ['2A', '3C'];
const premiumSeats = ['2C', '3D', '4A', '5C'];

export default function SeatSelectionScreen() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

const toggleSeat = (seat: string): void => {
    if (bookedSeats.includes(seat)) return;

    setSelectedSeats((prev: string[]) =>
        prev.includes(seat)
            ? prev.filter((s: string) => s !== seat)
            : [...prev, seat]
    );
};

  const totalFare = selectedSeats.reduce((sum, seat) => {
    return sum + SEAT_PRICE + (premiumSeats.includes(seat) ? PREMIUM_EXTRA : 0);
  }, 0);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Your Seats</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Seat Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Seat Legend</Text>

        <View style={styles.legendRow}>
          <LegendDot color="#fff" border />
          <Text>Available</Text>

          <LegendDot color="#FF7A30" />
          <Text>Selected</Text>
        </View>

        <View style={styles.legendRow}>
          <LegendDot color="#E0E0E0" />
          <Text>Booked</Text>

          <LegendDot color="#D9C2FF" />
          <Text>Premium</Text>
        </View>
      </View>

      {/* Seats */}
      <View style={styles.seatContainer}>
        <Text style={styles.frontBack}>FRONT</Text>

        {seatsData.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.seatRow}>
            {row.map((seat) => {
              const isBooked = bookedSeats.includes(seat);
              const isSelected = selectedSeats.includes(seat);
              const isPremium = premiumSeats.includes(seat);

              return (
                <TouchableOpacity
                  key={seat}
                  onPress={() => toggleSeat(seat)}
                  style={[
                    styles.seat,
                    isBooked && styles.bookedSeat,
                    isPremium && styles.premiumSeat,
                    isSelected && styles.selectedSeat,
                  ]}
                >
                  <Text
                    style={[
                      styles.seatText,
                      isSelected && { color: '#FF7A30' },
                    ]}
                  >
                    {seat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

        <Text style={styles.frontBack}>BACK</Text>
      </View>

      {/* Summary */}
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text>Selected Seats:</Text>
          <Text>
            {selectedSeats.length > 0
              ? selectedSeats.join(', ')
              : 'None selected'}
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total Fare:</Text>
          <Text style={styles.totalPrice}>NPR {totalFare.toFixed(2)}</Text>
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity
        style={[
          styles.payButton,
          selectedSeats.length === 0 && styles.disabledButton,
        ]}
        disabled={selectedSeats.length === 0}
        onPress={()=>router.push("/paymentTicketScreen")}
      >
        <Text style={styles.payText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const LegendDot = ({ color, border }:{color: string, border?:boolean}) => (
  <View
    style={[
      styles.dot,
      { backgroundColor: color },
      border && { borderWidth: 1, borderColor: '#ccc' },
    ]}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  legend: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
  },
  legendTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  seatContainer: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
  },
  frontBack: {
    fontSize: 12,
    color: '#777',
    marginVertical: 8,
  },
  seatRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  seat: {
    width: 54,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seatText: {
    fontWeight: '500',
  },
  bookedSeat: {
    backgroundColor: '#E0E0E0',
  },
  premiumSeat: {
    backgroundColor: '#F4EDFF',
    borderColor: '#C9A8FF',
  },
  selectedSeat: {
    borderColor: '#FF7A30',
    backgroundColor: '#FFF3EC',
  },
  summary: {
    marginTop: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  totalLabel: {
    fontWeight: '600',
  },
  totalPrice: {
    color: '#FF7A30',
    fontWeight: '700',
  },
  payButton: {
    backgroundColor: '#FF7A30',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#FFBE9D',
  },
  payText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
