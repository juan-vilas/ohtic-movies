import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

/**
 * Custom chip
 */
export default function Chip(props: PropsWithChildren) {
  return (
    <View style={styles.chipContainer}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chipContainer: {
    backgroundColor: "#33383f",
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
    borderRadius: 100,
  },
  text: { color: "white" },
});
