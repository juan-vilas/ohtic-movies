import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

/**
 * @interface Props
 * @property {boolean} selected - Selects the button
 * @property {any} children - Children to be shown inside the button
 * @property {() => void} onPress - On press function
 * @property {boolean} alignSelf - If false it converts to a full width button
 */
interface Props {
  selected?: boolean;
  children?: any;
  onPress: () => void;
  alignSelf?: boolean;
  _styles?: ViewStyle;
}

/**
 * Custom button
 */
export default function Button({
  selected,
  children,
  onPress,
  alignSelf = true,
  _styles = {},
}: Props) {
  return (
    <Pressable
      style={{
        ...(selected
          ? {
              ...styles.selected,
              alignSelf: alignSelf ? "flex-start" : "auto",
            }
          : {
              paddingVertical: 14,
              paddingHorizontal: 36,
            }),
        ..._styles,
      }}
      onPress={onPress}
    >
      <Text
        style={
          selected
            ? { color: "white", textAlign: "center" }
            : styles.notSelectedText
        }
      >
        {children}
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
