import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface Props {
  label: string;
  textInputConfig?: TextInputProps;
}

export default function Input({ label, textInputConfig }: Props) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.text}>{label}</Text>
      <TextInput style={styles.textInput} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    rowGap: 4,
  },
  text: { color: "white" },
  textInput: {
    borderColor: "#8d99ae",
    borderWidth: 2,
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
});
