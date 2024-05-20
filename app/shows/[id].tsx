import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import Movie3DCover from "@/components/Movie3DCover";

export default function ShowPage() {
  const { id, image } = useLocalSearchParams<{ id: string; image: string }>();

  return (
    <View style={styles.container}>
      <View style={styles.cover}>
        <Image
          source={{ uri: image }}
          style={styles.background}
          blurRadius={10}
        />
        <Movie3DCover
          animation={false}
          rotate
          width={150 * 1.3}
          height={220 * 1.3}
          image={image}
        />
      </View>

      <View style={styles.detailsContainer}>
        <View style={{ ...styles.section, borderTopWidth: 0 }}>
          <View style={{}}>
            <Text style={styles.title}>I Care a Lot</Text>
            <Text style={styles.date}>19 February 2020</Text>
          </View>
          <View style={{}}>
            <Text style={styles.rate}>RATE</Text>
            <Text style={styles.rate}>mind blowing</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.detailsText}>add to watchlist</Text>
          <Text style={styles.detailsText}>add to library</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Watch Online</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: { width: "100%", height: "120%", position: "absolute" },
  detailsContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#14181F",
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  detailsText: { color: "white" },
  section: {
    borderTopColor: "#1C1F25",
    borderTopWidth: 2,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { color: "white", fontSize: 20, fontWeight: "bold" },
  date: { color: "#959595", fontWeight: "semibold" },
  rate: { color: "white", fontWeight: "bold" },
});
