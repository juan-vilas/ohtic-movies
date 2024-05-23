import Button from "@/components/Button";
import Input from "@/components/Input";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Dimensions, Platform, StatusBar, StyleSheet } from "react-native";
import { View } from "react-native-animatable";

export default function SignupScreen() {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <LinearGradient
      colors={["#262A32", "#171B20", "#0B0F14"]}
      style={styles.background}
    >
      <View style={styles.container}>
        <Input
          label={"Username"}
          textInputConfig={{ placeholder: "my_username_example" }}
        />
        <Input
          label={"Email"}
          textInputConfig={{
            inputMode: "email",
            placeholder: "john.doe@example.com",
          }}
        />
        <Input label={"Password"} textInputConfig={{ secureTextEntry }} />
        <Input
          label={"Confirm Password"}
          textInputConfig={{ secureTextEntry }}
        />
        <Input
          label={"Birthday"}
          textInputConfig={{ placeholder: "YYYY-MM-DD" }}
        />
        <Button alignSelf={false} selected onPress={() => {}}>
          Signup
        </Button>
      </View>
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
