import { Tabs } from "expo-router";
import React, { ComponentProps } from "react";
import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { useColorScheme } from "@/components/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { StatusBar } from "expo-status-bar";
import Colors from "@/shared/constants/Colors";

function TabBarIcon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"]>) {
  return <Ionicons size={28} style={[style]} {...rest} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
            <View style={styles.iconStyle}>
              <TabBarIcon size={18} name={"chevron-back"} color={"#fff"} />
            </View>
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
