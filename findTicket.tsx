import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FindTickets() {
  const [type, setType] = useState<"flight" | "bus">("flight");

  return (
    <View style={{...styles.container}}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find Tickets</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* TOGGLE */}
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[styles.toggleBtn, type === "flight" && styles.active]}
            onPress={() => setType("flight")}
          >
            <Ionicons name="airplane" size={18} color={type === "flight" ? "#fff" : "#333"} />
            <Text style={[styles.toggleText, type === "flight" && { color: "#fff" }]}>
              Flight
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleBtn, type === "bus" && styles.active]}
            onPress={() => setType("bus")}
          >
            <Ionicons name="bus" size={18} color={type === "bus" ? "#fff" : "#333"} />
            <Text style={[styles.toggleText, type === "bus" && { color: "#fff" }]}>
              Bus
            </Text>
          </TouchableOpacity>
        </View>

        {/* FORM */}
        <View style={styles.card}>
          <Item label="Source Location" value="Kathmandu (KTM)" icon="navigate" />
          <Item label="Destination Location" value="Pokhara (PKR)" icon="location" />
          <Item label="Travel Date" value="Mon, August 12" icon="calendar" />
          <Item label="Passengers" value="1 Adult" icon="people" />
          <Item label="Class" value="Economy" icon="briefcase" />
        </View>

        {/* RECENT ROUTES */}
        <Text style={styles.section}>Recent Routes</Text>

        <Route title="Kathmandu → Biratnagar" tag="Flight" price="NPR 6,500" />
        <Route title="Pokhara → Chitwan" tag="Bus" price="NPR 700" />
        <Route title="Kathmandu → Lumbini" tag="Bus" price="NPR 900" />

        <TouchableOpacity style={styles.searchBtn} onPress={() => {router.push('/searchResultScreen')}}>
          <Text style={styles.searchText}>Search</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

/* ───── COMPONENTS ───── */

const Item = ({ label, value, icon }: any) => (
  <TouchableOpacity style={styles.item}>
    <Ionicons name={icon} size={18} color="#ff7043" />
    <View style={{ marginLeft: 12 }}>
      <Text style={styles.itemLabel}>{label}</Text>
      <Text style={styles.itemValue}>{value}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} style={{ marginLeft: "auto" }} />
  </TouchableOpacity>
);

const Route = ({ title, tag, price }: any) => (
  <View style={styles.route}>
    <View>
      <Text style={styles.routeTitle}>{title}</Text>
      <Text style={styles.routeSub}>{tag} · {price}</Text>
    </View>
    <TouchableOpacity style={styles.rebook}>
      <Text style={{ color: "#ff7043" }}>Re-book</Text>
    </TouchableOpacity>
  </View>
);

/* ───── STYLES ───── */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },

  toggleRow: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderRadius: 14,
    marginBottom: 18,
  },
  toggleBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    gap: 6,
    borderRadius: 14,
  },
  active: { backgroundColor: "#ff7043" },
  toggleText: { fontWeight: "600" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    elevation: 2,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },
  itemLabel: { fontSize: 12, color: "#777" },
  itemValue: { fontSize: 14, fontWeight: "600" },

  section: { fontSize: 16, fontWeight: "bold", marginTop: 24, marginBottom: 12 },

  route: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    elevation: 1,
  },
  routeTitle: { fontWeight: "600" },
  routeSub: { fontSize: 12, color: "#666", marginTop: 4 },

  rebook: {
    borderWidth: 1,
    borderColor: "#ff7043",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },

  searchBtn: {
    backgroundColor: "#ff7043",
    padding: 16,
    borderRadius: 18,
    marginTop: 20,
    alignItems: "center",
  },
  searchText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
