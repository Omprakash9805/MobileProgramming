// App.js - paste this into snack.expo.dev (App.js)
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const QuickAction = ({ icon, label }) => (
  <TouchableOpacity style={styles.actionCard}>
    {icon}
    <Text style={styles.actionLabel}>{label}</Text>
  </TouchableOpacity>
);

const BookingItem = ({ item }) => (
  <View style={styles.bookingItem}>
    <View style={{ flex: 1 }}>
      <Text style={styles.bookingTitle}>{item.route}</Text>
      <Text style={styles.bookingSub}>{item.date} • {item.time}</Text>
      <Text style={styles.bookingSub}>Seat: {item.seat} • {item.type}</Text>
    </View>
    <View style={styles.bookingRight}>
      <Text style={styles.price}>Rs {item.price}</Text>
      <TouchableOpacity style={styles.viewBtn}>
        <Text style={styles.viewBtnText}>View</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function App() {
  const recent = [
    { id: "1", route: "Kathmandu → Pokhara (Bus)", date: "2025-12-01", time: "07:30", seat: "12A", type: "Sleeper", price: 700 },
    { id: "2", route: "Kathmandu → Delhi (Flight)", date: "2025-12-05", time: "09:45", seat: "18C", type: "Economy", price: 8500 },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#f6f7fb" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.brand}>Ticketly</Text>
          <Text style={styles.tag}>Bus & Flight</Text>
        </View>
        <TouchableOpacity style={styles.avatar}>
          <Ionicons name="person-circle-outline" size={34} color="#2d3748" />
        </TouchableOpacity>
      </View>

      {/* Main Container */}
      <View style={styles.container}>

        {/* Cards */}
        <View style={styles.cardRow}>
          <TouchableOpacity style={[styles.card, styles.cardPrimary]}>
            <View style={styles.cardLeft}>
              <MaterialIcons name="directions-bus" size={28} color="#fff" />
              <Text style={styles.cardTitle}>Book Bus</Text>
              <Text style={styles.cardSub}>Find routes, seats & prices</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, styles.cardSecondary]}>
            <View style={styles.cardLeft}>
              <MaterialIcons name="flight" size={28} color="#fff" />
              <Text style={styles.cardTitle}>Book Flight</Text>
              <Text style={styles.cardSub}>Compare airlines & fares</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        <View style={styles.actionsRow}>
          <QuickAction icon={<Ionicons name="search" size={28} color="#2563eb" />} label="Search" />
          <QuickAction icon={<MaterialIcons name="schedule" size={28} color="#f59e0b" />} label="My Trips" />
          <QuickAction icon={<Ionicons name="wallet" size={28} color="#10b981" />} label="Payments" />
          <QuickAction icon={<Ionicons name="md-pricetags" size={28} color="#ef4444" />} label="Offers" />
        </View>

        {/* Recent Bookings */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Bookings</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
        </View>

        <FlatList
          data={recent}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => <BookingItem item={item} />}
          style={{ marginTop: 8 }}
        />
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomTabs}>
        <TouchableOpacity style={styles.tab}>
          <Ionicons name="home-outline" size={22} />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab}>
          <Ionicons name="calendar-outline" size={22} />
          <Text style={styles.tabLabel}>Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab}>
          <Ionicons name="notifications-outline" size={22} />
          <Text style={styles.tabLabel}>Alerts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tab}>
          <Ionicons name="settings-outline" size={22} />
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f6f7fb" },
  header: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: { flexDirection: "column" },
  brand: { fontSize: 20, fontWeight: "700", color: "#111827" },
  tag: { fontSize: 12, color: "#6b7280" },
  avatar: { padding: 6 },

  container: { flex: 1, paddingHorizontal: 16 },

  cardRow: { flexDirection: "row", justifyContent: "space-between", gap: 10 },

  card: {
    flex: 1,
    borderRadius: 12,
    padding: 14,
    marginTop: 6,
    minHeight: 96,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  cardPrimary: { backgroundColor: "#2563eb", marginRight: 8 },
  cardSecondary: { backgroundColor: "#8b5cf6" },

  cardLeft: { flex: 1 },
  cardTitle: { color: "#fff", fontWeight: "700", marginTop: 6 },
  cardSub: { color: "#e6eefc", fontSize: 12, marginTop: 4 },

  sectionHeader: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#111827" },
  seeAll: { color: "#2563eb" },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginRight: 8,
    alignItems: "center",
    elevation: 2,
  },
  actionLabel: {
    marginTop: 6,
    fontSize: 12,
    color: "#374151",
    fontWeight: "600",
  },

  bookingItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    elevation: 1,
  },
  bookingTitle: { fontWeight: "700", color: "#0f172a" },
  bookingSub: { color: "#6b7280", fontSize: 12, marginTop: 4 },

  bookingRight: { alignItems: "flex-end" },
  price: { fontWeight: "700", color: "#111827" },
  viewBtn: {
    marginTop: 8,
    backgroundColor: "#2563eb",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  viewBtnText: { color: "#fff", fontWeight: "600", fontSize: 12 },

  bottomTabs: {
    height: 64,
    borderTopWidth: 1,
    borderColor: "#e6e6e6",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  tab: { alignItems: "center" },
  tabLabel: { fontSize: 11, marginTop: 2 },
});
