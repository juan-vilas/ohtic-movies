const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export default {
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
};
