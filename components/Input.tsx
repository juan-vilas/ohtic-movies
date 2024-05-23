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
  error?: string;
}

export default function Input({ label, textInputConfig, error = "" }: Props) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.text}>{label}</Text>
      <TextInput style={styles.textInput} {...textInputConfig} />
      {error.length === 0 ? null : (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {},
  text: { color: "white", marginBottom: 4 },
  errorText: { color: "#f4978e" },
  textInput: {
    borderColor: "#8d99ae",
    borderWidth: 2,
    backgroundColor: "white",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
});
