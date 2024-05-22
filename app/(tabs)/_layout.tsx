import Colors from "@/shared/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { Tabs, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { ComponentProps } from "react";
import { Pressable, StyleSheet, View } from "react-native";

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
          headerShown: true,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "white", // Colors[colorScheme ?? "light"].tint,
          headerTitleAlign: "center",
          headerTitleStyle: { color: "#fff" },
          headerTransparent: true,
          headerLeft: () => (
            <Pressable style={styles.iconStyle} onPress={() => router.back()}>
              <TabBarIcon size={18} name={"chevron-back"} color={"#fff"} />
            </Pressable>
          ),
          headerRight: () => (
            <View style={styles.iconStyle}>
              <TabBarIcon size={18} name={"settings-outline"} color={"#fff"} />
            </View>
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
                name={"search"}
                color={focused ? color : Colors.tabs.iconStyle.unfocusedColor}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="two"
          options={{
            title: "Explore",
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
