import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import Movie3DCover from "@/components/Movie3DCover";

export default function ShowPage() {
  const { id, image } = useLocalSearchParams<{ id: string; image: string }>();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "70%",
        }}
      >
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
          width={150 * 1.3}
          height={220 * 1.3}
          image={image}
        />
      </View>

      <View>
        <Text>I care a lot</Text>
        <Text>19 fev 2020</Text>
        <Text>mind blowing</Text>
        <Text>add to watchlist</Text>
        <Text>add to library</Text>
        <Text>watch online</Text>
      </View>
    </View>
  );
}
