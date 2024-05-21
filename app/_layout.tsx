import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ComponentProps, useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { Pressable, StatusBar, StyleSheet, View } from "react-native";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/shared/constants/Colors";
import { Provider } from "react-redux";
import { store } from "@/shared/redux/store";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function TabBarIcon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"]>) {
  return <Ionicons size={28} style={[style]} {...rest} />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          <Stack.Screen
            name="shows/[id]"
            options={{
              presentation: "modal",
              headerShown: true,
              headerTransparent: true,
              title: "",
              headerLeft: () => (
                <Pressable
                  style={{ ...styles.iconStyle, marginHorizontal: 0 }}
                  onPress={() => router.back()}
                >
                  <TabBarIcon size={18} name={"chevron-back"} color={"#fff"} />
                </Pressable>
              ),
            }}
          />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}

export const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: Colors.tabs.tabBarStyle.backgroundColor,
    borderColor: Colors.tabs.tabBarStyle.borderColor,
    borderWidth: 1,
    marginBottom: 18,
    marginHorizontal: 18,
    height: 62,
    position: "absolute",
    borderRadius: 100,
  },
  iconStyle: {
    backgroundColor: Colors.tabs.iconStyle.backgroundColor,
    borderColor: Colors.tabs.iconStyle.borderColor,
    borderWidth: 1,
    padding: 10,
    borderRadius: 100,
    marginHorizontal: 18,
  },
});
