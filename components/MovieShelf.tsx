import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Movie3DCover from "./Movie3DCover";
import Colors from "@/shared/constants/Colors";
import { Result } from "@/shared/interfaces/trending";

interface Props {
  data: Result[];
  extraData: boolean;
  height: number;
  extraHeight?: number;
  width?: number;
}

export default function MovieShelf({
  data,
  extraData,
  height,
  extraHeight = 34,
  width = 150,
}: Props) {
  return (
    <View style={styles.movieShelfContainer}>
      <FlashList
        horizontal
        data={data}
        extraData={extraData}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flashListContainer}
        ListHeaderComponent={() => <LeftShelf />}
        renderItem={({ item }: { item: Result }) => {
          return (
            <View
              style={{
                height: height + extraHeight,
              }}
            >
              <Movie3DCover
                data={item}
                width={width}
                height={height}
                style={styles.movie3DCoverContainer}
              />
              <MiddleShelf />
            </View>
          );
        }}
        estimatedItemSize={height + extraHeight}
      />
    </View>
  );
}

function MiddleShelf() {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        height: 70,
        width: "100%",
        zIndex: -1,
      }}
    >
      <View
        style={{
          backgroundColor: Colors.shelf.baseColor,
          height: 50,
          width: "100%",
        }}
      ></View>
      <View
        style={{
          backgroundColor: Colors.shelf.borderColor,
          height: 20,
        }}
      ></View>
    </View>
  );
}

function LeftShelf() {
  return (
    <View
      style={{
        position: "absolute",
        left: -50,
        bottom: 0,
        zIndex: 10,
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
            borderTopColor: Colors.shelf.baseColor,
            transform: [{ rotate: "180deg" }],
          }}
        ></View>
      </View>
      <View
        style={{
          backgroundColor: Colors.shelf.borderColor,
          borderBottomLeftRadius: 10,
          height: 20,
        }}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  movieShelfContainer: {
    marginVertical: 32,
  },
  flashListContainer: {
    paddingLeft: 90,
  },
  movie3DCoverContainer: {
    marginRight: 50,
  },
});
