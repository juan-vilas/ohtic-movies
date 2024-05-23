import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
  selected?: boolean;
  children?: any;
  onPress: () => void;
  alignSelf?: boolean;
}

export default function Button({
  selected,
  children,
  onPress,
  alignSelf = true,
}: Props) {
  return (
    <Pressable
      style={
        selected
          ? {
              ...styles.selected,
              alignSelf: alignSelf ? "flex-start" : "auto",
            }
          : {
              paddingVertical: 14,
              paddingHorizontal: 36,
            }
      }
      onPress={onPress}
    >
      <Text
        style={
          selected
            ? { color: "white", textAlign: "center" }
            : styles.notSelectedText
        }
      >
        {children?.toString()}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  selected: {
    backgroundColor: "#1F2226",
    borderRadius: 100,
    paddingVertical: 14,
    paddingHorizontal: 36,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  notSelectedText: {
    color: "#949599",
  },
});
