import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

/**
 * @interface Props
 * @property {string} label - Label to be shown above the text input
 * @property {TextInputProps} textInputConfig - Text input props
 * @property {string} error - Shows an error text if not empty
 */
interface Props {
  label?: string;
  textInputConfig?: TextInputProps;
  error?: string;
  variant?: "primary" | "secondary";
  _styles?: ViewStyle;
}

/**
 * Custom Input for the form
 */
export default function Input({
  label = "",
  textInputConfig,
  error = "",
  variant = "primary",
  _styles = {},
}: Props) {
  return (
    <View style={[styles.inputContainer, _styles]}>
      {label.length > 0 ? <Text style={styles.text}>{label}</Text> : null}
      <TextInput
        style={[
          styles.textInput,
          variant === "primary"
            ? styles.textInputPrimary
            : styles.textInputSecondary,
        ]}
        {...textInputConfig}
        placeholderTextColor={"#AAAAAA"}
      />
      {error.length > 0 ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {},
  text: { color: "white", marginBottom: 4 },
  errorText: { color: "#f4978e" },
  textInput: {
    backgroundColor: "#2E2E2E",
    color: "white",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  textInputPrimary: {
    backgroundColor: "#2E2E2E",
  },
  textInputSecondary: {
    backgroundColor: "transparent",
    borderBottomWidth: 2,
    borderBottomColor: "#2E2E2E",
  },
});
