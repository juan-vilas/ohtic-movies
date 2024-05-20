import React, { ComponentProps, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, Text, StatusBar as SB } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { View } from "@/components/Themed";
import * as Animatable from "react-native-animatable";

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
          tabBarShowLabel: false,
          tabBarActiveTintColor: "white", // Colors[colorScheme ?? "light"].tint,
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: { color: "#fff" },
          headerTransparent: true,
          headerLeft: () => (
            <View
              style={{
                backgroundColor: "rgba(20, 24, 32, 0.90)",
                borderColor: "#11141B",
                borderWidth: 1,
                padding: 10,
                borderRadius: 100,
                marginLeft: 18,
              }}
            >
              <TabBarIcon size={18} name={"chevron-back"} color={"#fff"} />
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                backgroundColor: "rgba(20, 24, 32, 0.90)",
                borderColor: "#11141B",
                borderWidth: 1,
                padding: 10,
                borderRadius: 100,
                marginRight: 18,
              }}
            >
              <TabBarIcon size={18} name={"settings-outline"} color={"#fff"} />
            </View>
          ),
          tabBarStyle: {
            backgroundColor: "rgba(10, 15, 20, 0.90)",
            borderColor: "#1C1F25",
            borderWidth: 1,
            marginBottom: 18,
            marginHorizontal: 18,
            height: 62,
            position: "absolute",
            borderRadius: 100,
          },
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
                color={focused ? color : "#707377"}
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
                color={focused ? color : "#707377"}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
