import Colors from "@/shared/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { Tabs, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { ComponentProps } from "react";
import { Platform, Pressable, StyleSheet } from "react-native";
import { HeaderLeft } from "../_layout";

function TabBarIcon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"]>) {
  return <Ionicons size={28} style={[style]} {...rest} />;
}

export default function TabLayout() {
  return (
    <>
      <StatusBar style="light"></StatusBar>

      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "white", // Colors[colorScheme ?? "light"].tint,
          headerTitleAlign: "center",
          headerTitleStyle: { color: "#fff" },
          headerTransparent: true,
          headerLeft: () => <HeaderLeft />,
          headerRight: () => (
            <Pressable
              style={styles.iconStyle}
              onPress={() => router.push("signup")}
            >
              <TabBarIcon size={18} name={"person-outline"} color={"#fff"} />
            </Pressable>
          ),
          tabBarStyle: styles.tabBarStyle,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerLeft: () => null,
            title: "Ohtic!",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                size={24}
                name={"home-outline"}
                color={focused ? color : Colors.tabs.iconStyle.unfocusedColor}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="watchlist"
          options={{
            title: "Watchlist",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                size={24}
                name={"bookmark-outline"}
                color={focused ? color : Colors.tabs.iconStyle.unfocusedColor}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

export const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: Colors.tabs.tabBarStyle.backgroundColor,
    borderColor: Colors.tabs.tabBarStyle.borderColor,
    borderWidth: 1,
    marginBottom: 18,
    marginHorizontal: 18,
    height: Platform.OS === "android" ? 62 : 62,
    position: "absolute",
    borderRadius: 100,
    paddingBottom: 0, // Needed for ios
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
