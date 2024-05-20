import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import Movie3DCover from "@/components/Movie3DCover";

export default function ShowPage() {
  const { id, image } = useLocalSearchParams<{ id: string; image: string }>();

  return (
    <View style={{}}>
      <Image
        source={{ uri: image }}
        fadeDuration={0}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
        blurRadius={10}
      />
      <Movie3DCover
        animation={false}
        rotate
        width={150}
        height={220}
        image={image}
      />
      <Movie3DCover
        animation={false}
        rotate
        width={150}
        height={220}
        image={image}
      />
    </View>
  );
}
