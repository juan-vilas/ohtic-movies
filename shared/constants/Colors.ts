const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export default {
  // Expo default colors
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
  // Custom colors
  tabs: {
    tabBarStyle: {
      backgroundColor: "rgba(10, 15, 20, 0.90)",
      borderColor: "#1C1F25",
    },
    iconStyle: {
      backgroundColor: "rgba(20, 24, 32, 0.90)",
      borderColor: "#11141B",
      unfocusedColor: "#707377",
    },
  },
  shelf: {
    baseColor: "#12151A",
    borderColor: "#1B1E24",
  },
};
