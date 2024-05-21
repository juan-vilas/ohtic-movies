import { FlashList } from "@shopify/flash-list";
import React from "react";
import { View } from "react-native";
import Movie3DCover from "./Movie3DCover";

export default function MovieShelf({
  data,
  extraData,
}: {
  data: any;
  extraData: any;
}) {
  return (
    <View style={{ marginVertical: 32 }}>
      <FlashList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 90 }}
        data={data}
        extraData={extraData}
        renderItem={({ item }: any) => {
          return (
            <Movie3DCover
              data={item}
              width={150}
              height={220}
              style={{ marginRight: 50 }}
            />
          );
        }}
        estimatedItemSize={220}
      />

      <View
        style={{
          height: 50,
          width: "100%",
          zIndex: -1,
          position: "absolute",
          bottom: -14,
          left: 34,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: 0,
              height: 0,
              backgroundColor: "transparent",
              borderStyle: "solid",
              borderRightWidth: 50,
              borderTopWidth: 50,
              borderRightColor: "transparent",
              borderTopColor: "#12151A",
              transform: [{ rotate: "180deg" }],
            }}
          ></View>
          <View
            style={{
              backgroundColor: "#12151A",
              height: "100%",
              width: "100%",
            }}
          ></View>
        </View>
        <View
          style={{
            backgroundColor: "#1B1E24",
            borderBottomLeftRadius: 10,
            height: 20,
            width: "100%",
          }}
        ></View>
      </View>
    </View>
  );
}
