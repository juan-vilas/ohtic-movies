import { LinearGradient } from "expo-linear-gradient";
import React, { PropsWithChildren } from "react";
import { Dimensions, Platform, StatusBar, StyleSheet } from "react-native";

export default function ThemedView(props: PropsWithChildren) {
  return (
    <LinearGradient
      colors={["#262A32", "#171B20", "#0B0F14"]}
      style={styles.background}
    >
      {props.children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("screen").height,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
