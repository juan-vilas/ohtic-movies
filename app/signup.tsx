import Button from "@/components/Button";
import Input from "@/components/Input";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

/**
 * Sign up screen
 */
export default function SignupScreen() {
  // Error states
  const [usernameErrors, setUsernameErrors] = useState({});
  const [emailErrors, setEmailErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  const [birthdateErrors, setBirthdateErrors] = useState({});
  // Input states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdayDate, setBirthdayDate] = useState("");

  const resetErrors = () => {
    setUsernameErrors({});
    setEmailErrors({});
    setPasswordErrors({});
    setBirthdateErrors({});
  };

  const resetStates = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setBirthdayDate("");
  };

  useEffect(() => {
    resetStates();
  }, []);

  const sumbitHandler = () => {
    resetErrors();
    const errors = [];

    if (username.length < 4) {
      const error = { minLength: "Minimun length is 4" };
      setUsernameErrors(error);
      errors.push(error);
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      const error = { invalid: "Please use a valid email" };
      setEmailErrors(error);
      errors.push(error);
    }

    if (password !== confirmPassword) {
      const error = { invalid: "Please use the same password" };
      setPasswordErrors(error);
      errors.push(error);
    }

    if (password.length < 8) {
      const error = { minLength: "Minimun length is 8" };
      setPasswordErrors(error);
      errors.push(error);
    }

    if (new Date(birthdayDate).toString() === "Invalid Date") {
      const error = { invalidDate: "Provide a valid date" };
      setBirthdateErrors(error);
      errors.push(error);
    }

    if (errors.length > 0) {
      Alert.alert("❌ Error", "Please check your input values", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }

    // Send data to server...
    resetStates();
    Alert.alert("✅ Ok", "You have just signed up!", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <LinearGradient
      colors={["#262A32", "#171B20", "#0B0F14"]}
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-500}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <Input
              label={"Username"}
              textInputConfig={{
                placeholder: "my_username_example",
                onChangeText(text) {
                  setUsername(text);
                },
              }}
              error={Object.values(usernameErrors)[0] as string}
            />
            <Input
              label={"Email"}
              textInputConfig={{
                inputMode: "email",
                placeholder: "john.doe@example.com",
                onChangeText(text) {
                  setEmail(text);
                },
              }}
              error={Object.values(emailErrors)[0] as string}
            />
            <Input
              label={"Password"}
              textInputConfig={{
                secureTextEntry: true,
                onChangeText(text) {
                  setPassword(text);
                },
              }}
              error={Object.values(passwordErrors)[0] as string}
            />
            <Input
              label={"Confirm Password"}
              textInputConfig={{
                secureTextEntry: true,
                onChangeText(text) {
                  setConfirmPassword(text);
                },
              }}
            />
            <Input
              label={"Birthday"}
              textInputConfig={{
                placeholder: "YYYY-MM-DD",
                onChangeText(text) {
                  setBirthdayDate(text);
                },
              }}
              error={Object.values(birthdateErrors)[0] as string}
            />
            <Button alignSelf={false} selected onPress={() => sumbitHandler()}>
              Signup
            </Button>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 86,
    paddingHorizontal: 46,
    rowGap: 24,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

function isObjectEmpty(obj: Object) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
