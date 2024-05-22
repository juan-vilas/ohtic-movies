import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
  selected?: boolean;
  children?: any;
  onPress: () => void;
}

export default function Button(props: Props) {
  return (
    <Pressable
      style={
        props.selected
          ? styles.selected
          : {
              paddingVertical: 14,
              paddingHorizontal: 36,
            }
      }
      onPress={props.onPress}
    >
      <Text
        style={props.selected ? { color: "white" } : styles.notSelectedText}
      >
        {props.children?.toString()}
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
    alignSelf: "flex-start",
  },
  notSelectedText: {
    color: "#949599",
  },
});
