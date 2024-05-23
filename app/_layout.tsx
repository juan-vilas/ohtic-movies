import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ComponentProps, useEffect } from "react";
import "react-native-reanimated";

import Colors from "@/shared/constants/Colors";
import { store } from "@/shared/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { Pressable, StyleSheet } from "react-native";
import { View } from "react-native-animatable";
import { Provider } from "react-redux";

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

export function HeaderLeft() {
  return (
    <Pressable style={styles.iconStyle} onPress={() => router.back()}>
      <TabBarIcon size={18} name={"chevron-back"} color={"#fff"} />
    </Pressable>
  );
}

function RootLayoutNav() {
  return (
    <Provider store={store}>
      <View style={{ backgroundColor: "black", flex: 1 }}>
        <Stack
          screenOptions={{
            headerLeft: () => <HeaderLeft />,
          }}
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="signup"
            options={{
              presentation: "modal",
              headerShown: true,
              headerTransparent: true,
              title: "",
            }}
          />
          <Stack.Screen
            name="details/[data]"
            options={{
              presentation: "modal",
              headerShown: true,
              headerTransparent: true,
              title: "",
            }}
          />
        </Stack>
      </View>
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
