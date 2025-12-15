import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PaymentETicketScreen() {
  const [paymentMethod, setPaymentMethod] = useState('esewa');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment & E-ticket</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)')}>
        <Ionicons name="home-outline" size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Booking Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Booking Summary</Text>

          <SummaryRow icon="bus" label="Route">
            Kathmandu to Pokhara (Bus)
          </SummaryRow>

          <SummaryRow icon="people" label="Operator">
            XYZ Bus Service
          </SummaryRow>

          <SummaryRow icon="calendar" label="Departure">
            25th May 2024, 07:00 AM
          </SummaryRow>

          <SummaryRow icon="time" label="Arrival">
            25th May 2024, 02:00 PM
          </SummaryRow>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Payable:</Text>
            <Text style={styles.totalPrice}>NPR 2,750</Text>
          </View>
        </View>

        {/* Payment Options */}
        <Text style={styles.sectionTitle}>Payment Options</Text>

        <View style={styles.paymentGrid}>
          <PaymentCard
            title="eSewa"
            subtitle="Instant payment via eSewa wallet"
            selected={paymentMethod === 'esewa'}
            onPress={() => setPaymentMethod('esewa')}
          />

          <PaymentCard
            title="IME Pay"
            subtitle="Secure payment via IME Pay"
            selected={paymentMethod === 'ime'}
            onPress={() => setPaymentMethod('ime')}
          />

          <PaymentCard
            title="Card Payment"
            subtitle="Visa, Mastercard, Amex, Discover"
            selected={paymentMethod === 'card'}
            onPress={() => setPaymentMethod('card')}
          />

          <PaymentCard
            title="Bank Transfer"
            subtitle="Transfer from any Nepali bank"
            selected={paymentMethod === 'bank'}
            onPress={() => setPaymentMethod('bank')}
          />
        </View>

        {/* E-ticket */}
        <View style={styles.card}>
          <Text style={styles.confirmed}>E-Ticket Confirmed!</Text>
          <Text style={styles.ticketId}>Ticket ID: NYT-123456789</Text>

          <TicketRow label="Traveler" value="John Doe" />
          <TicketRow label="Seat Numbers" value="12A, 12B" />
          <TicketRow label="Route" value="Kathmandu to Pokhara" />
          <TicketRow label="Departure" value="May 25, 2024, 07:00 AM" />
          <TicketRow label="Arrival" value="May 25, 2024, 02:00 PM" />

          {/* QR Placeholder */}
          <View style={styles.qrBox}>
            <Ionicons name="qr-code" size={48} color="#555" />
          </View>

          <Text style={styles.qrText}>
            Scan at check-in or boarding
          </Text>

          {/* Actions */}
          <View style={styles.actionRow}>
            <ActionButton icon="save-outline" text="Save Ticket" />
            <ActionButton icon="share-social-outline" text="Share Ticket" />
          </View>
        </View>
      </ScrollView>

      {/* Pay Now */}
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payText}>Pay Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/* ---------------- COMPONENTS ---------------- */

const SummaryRow = ({ icon, label, children }:{icon:any, label:string, children:any}) => (
  <View style={styles.summaryRow}>
    <Ionicons name={icon} size={18} color="#777" />
    <Text style={styles.summaryLabel}>{label}:</Text>
    <Text style={styles.summaryValue}>{children}</Text>
  </View>
);

const PaymentCard = ({ title, subtitle, selected, onPress }:{title:string, subtitle:string, selected:any, onPress:any}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.paymentCard,
      selected && styles.selectedPayment,
    ]}
  >
    <MaterialIcons name="account-balance-wallet" size={20} color="#FF7A30" />
    <View style={{ flex: 1 }}>
      <Text style={styles.paymentTitle}>{title}</Text>
      <Text style={styles.paymentSubtitle}>{subtitle}</Text>
    </View>
    <Ionicons
      name={selected ? 'radio-button-on' : 'radio-button-off'}
      size={18}
      color="#FF7A30"
    />
  </TouchableOpacity>
);

const TicketRow = ({ label, value }:{label:string, value: string}) => (
  <View style={styles.ticketRow}>
    <Text style={styles.ticketLabel}>{label}:</Text>
    <Text style={styles.ticketValue}>{value}</Text>
  </View>
);

const ActionButton = ({ icon, text }:{icon:any, text: string}) => (
  <TouchableOpacity style={styles.actionBtn}>
    <Ionicons name={icon} size={18} />
    <Text style={styles.actionText}>{text}</Text>
  </TouchableOpacity>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    margin: 14,
    padding: 14,
    borderRadius: 14,
  },
  cardTitle: {
    fontWeight: '600',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  summaryLabel: {
    color: '#555',
  },
  summaryValue: {
    flex: 1,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontWeight: '600',
  },
  totalPrice: {
    color: '#FF7A30',
    fontWeight: '700',
  },
  sectionTitle: {
    marginHorizontal: 14,
    marginTop: 6,
    fontWeight: '600',
  },
  paymentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    padding: 14,
  },
  paymentCard: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  selectedPayment: {
    borderColor: '#FF7A30',
    backgroundColor: '#FFF3EC',
  },
  paymentTitle: {
    fontWeight: '600',
  },
  paymentSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  confirmed: {
    color: '#FF7A30',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 4,
  },
  ticketId: {
    color: '#777',
    marginBottom: 10,
  },
  ticketRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  ticketLabel: {
    color: '#666',
  },
  ticketValue: {
    fontWeight: '500',
  },
  qrBox: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#F1F1F1',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  qrText: {
    textAlign: 'center',
    color: '#777',
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  actionText: {
    fontWeight: '500',
  },
  payButton: {
    backgroundColor: '#FF7A30',
    padding: 16,
    margin: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  payText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
