import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import Movie3DCover from "@/components/Movie3DCover";

export default function ShowPage() {
  const { id, image } = useLocalSearchParams<{ id: string; image: string }>();

  return (
    <View
      style={{
        width: 150,
        height: 220,
      }}
    >
      <Movie3DCover rotate width={150} height={220} image={image} />
    </View>
  );
}
