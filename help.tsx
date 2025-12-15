import { database } from "@/utils/firebase";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ref, set } from "firebase/database";
import React, { useState } from "react";
import {
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const FAQItem = ({ question }: { question: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <TouchableOpacity
      style={styles.faqItem}
      onPress={() => setOpen(!open)}
      activeOpacity={0.7}
    >
      <Text style={styles.faqText}>{question}</Text>
      <Ionicons
        name={open ? "chevron-up" : "chevron-down"}
        size={20}
        color="#555"
      />
    </TouchableOpacity>
  );
};

export default function HelpScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const complain = async () => {
    try {
      await set(ref(database, `complains/${name}`), {
        description: description,
        createdAt: new Date().toISOString(),
      });

      router.replace("/");
    } catch (error) {
      console.error("Failed to submit complain:", error);
    }
  };
  // complain.then((e)=>console.log(e)).catch((err)=>console.log(err));

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customer Support</Text>
      </View>

      {/* FAQ Section */}
      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

      <FAQItem question="How do I book a bus ticket on Nepal Yatra?" />
      <FAQItem question="Can I cancel or modify my flight ticket after booking?" />
      <FAQItem question="What local payment methods are accepted for bookings?" />
      <FAQItem question="How can I check the real-time departure status of my bus?" />
      <FAQItem question="Are there any discounts for frequent travelers within Nepal?" />

      {/* Contact Section */}
      <Text style={styles.sectionTitle}>Contact Us Directly</Text>

      <View style={styles.contactButtons}>
        <TouchableOpacity
          style={styles.contactBtn}
          onPress={() => Linking.openURL("tel:+97715550123")}
        >
          <Ionicons name="call" size={18} color="#fff" />
          <Text style={styles.contactText}>Call Support</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactBtn}
          onPress={() => Linking.openURL("mailto:support@nepalyatra.com")}
        >
          <Ionicons name="mail" size={18} color="#fff" />
          <Text style={styles.contactText}>Email Us</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.contactInfo}>Phone: +977-1-555-0123</Text>
      <Text style={styles.contactInfo}>Email: support@nepalyatra.com</Text>
      <Text style={styles.contactInfo}>
        Support Hours: Sun–Fri, 9 AM – 6 PM NPT
      </Text>

      {/* Send Request */}
      <Text style={styles.sectionTitle}>Send a Request</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Regarding my booking #TRV123..."
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Please describe your issue or question in detail."
        multiline
        value={description}
        onChangeText={setDescription}
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.submitBtn} onPress={complain}>
        <Text style={styles.submitText}>Submit Request</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },

  faqItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  faqText: {
    fontSize: 14,
    color: "#333",
    width: "90%",
  },

  contactButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },

  contactBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff7a50",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: "48%",
    justifyContent: "center",
  },

  contactText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "600",
  },

  contactInfo: {
    fontSize: 13,
    color: "#555",
    marginBottom: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  submitBtn: {
    backgroundColor: "#ff7a50",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },

  submitText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
