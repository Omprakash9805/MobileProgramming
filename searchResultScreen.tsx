import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const DATA = [
  {
    id: '1',
    type: 'Flight',
    company: 'Yeti Airlines',
    fromTime: '07:30 AM',
    toTime: '08:00 AM',
    duration: '30m',
    price: '4,500',
    info: '1 personal bag included',
    seats: '12 seats available',
    direct: 'Direct',
  },
  {
    id: '2',
    type: 'Bus',
    company: 'GreenLine Tours',
    fromTime: '06:00 AM',
    toTime: '01:00 PM',
    duration: '7h',
    price: '1,200',
    info: '1 checked bag, 1 personal item',
    seats: '25 seats available',
    direct: 'Direct',
  },
  {
    id: '3',
    type: 'Flight',
    company: 'Buddha Air',
    fromTime: '09:00 AM',
    toTime: '09:45 AM',
    duration: '1 Stop',
    price: '5,800',
    info: 'Carry-on and personal bag',
    seats: '8 seats available',
    direct: 'Self transfer',
  },
  {
    id: '4',
    type: 'Bus',
    company: 'Baba Deluxe',
    fromTime: '08:00 AM',
    toTime: '04:30 PM',
    duration: '8h 30m',
    price: '950',
    info: 'Small backpack only',
    seats: '30 seats available',
    direct: 'Direct',
  },
  {
    id: '5',
    type: 'Flight',
    company: 'Saurya Airlines',
    fromTime: '11:00 AM',
    toTime: '11:35 AM',
    duration: '35m',
    price: '3,900',
    info: '1 personal bag included',
    seats: '15 seats available',
    direct: 'Direct',
  },
];

export default function SearchResultsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>router.back()}>
        <Ionicons name="arrow-back" size={22} />
            </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Results</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="swap-vertical" size={20} />
          <Ionicons name="filter" size={20} />
        </View>
      </View>

      {/* Route Card */}
      <View style={styles.routeCard}>
        <Text style={styles.routeText}>Kathmandu  ›  Pokhara</Text>
        <Text style={styles.subText}>
          Mon, 15 Oct • 1 Adult • Economy
        </Text>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <FilterChip text="Sort by Best" active />
        <FilterChip text="Stops" />
        <FilterChip text="Duration" />
        <FilterChip text="Price" />
      </View>

      {/* Results */}
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => <ResultCard item={item} />}
      />
    </SafeAreaView>
  );
}

const FilterChip = ({ text, active=false }: {text: string,active?:boolean}) => (
  <View style={[styles.chip, active && styles.activeChip]}>
    <Text style={[styles.chipText, active && { color: '#fff' }]}>
      {text}
    </Text>
  </View>
);

const ResultCard = ({ item }:{item: any}) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.company}>{item.company}</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{item.type}</Text>
      </View>
    </View>

    <View style={styles.timeRow}>
      <Text style={styles.time}>{item.fromTime}</Text>
      <Text style={styles.duration}>{item.duration}</Text>
      <Text style={styles.time}>{item.toTime}</Text>
    </View>

    <Text style={styles.direct}>{item.direct}</Text>

    <View style={styles.footer}>
      <View>
        <Text style={styles.price}>NPR {item.price}</Text>
        <Text style={styles.info}>{item.info}</Text>
        <Text style={styles.seats}>{item.seats}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={()=>router.push("/seatSelectionScreen")}>
        <Text style={styles.buttonText}>Select Seats</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 14,
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
  headerIcons: {
    flexDirection: 'row',
    gap: 14,
  },
  routeCard: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  routeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  subText: {
    color: '#777',
    marginTop: 4,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeChip: {
    backgroundColor: '#FF7A30',
    borderColor: '#FF7A30',
  },
  chipText: {
    fontSize: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  company: {
    fontSize: 15,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: '#EAF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  badgeText: {
    color: '#2E6CF6',
    fontSize: 12,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
  },
  duration: {
    color: '#777',
    alignSelf: 'center',
  },
  direct: {
    color: '#FF7A30',
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  price: {
    color: '#FF7A30',
    fontSize: 18,
    fontWeight: '700',
  },
  info: {
    color: '#666',
    fontSize: 12,
  },
  seats: {
    color: '#666',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#FF7A30',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 22,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
