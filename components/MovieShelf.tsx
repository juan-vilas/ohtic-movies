import Colors from "@/shared/constants/Colors";
import { MediaData } from "@/shared/interfaces/trending";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, View } from "react-native";
import Movie3DCover from "./Movie3DCover";

interface Props {
  data: MediaData[];
  height: number;
  extraHeight?: number;
  width?: number;
}

export default function MovieShelf({
  data,
  height,
  extraHeight = 34,
  width = 150,
}: Props) {
  return (
    <View style={styles.movieShelfContainer}>
      <FlashList
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flashListContainer}
        ListHeaderComponent={() => (data.length > 0 ? <LeftShelf /> : null)}
        renderItem={({ item }: { item: MediaData }) => {
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
    <View style={styles.middleShelfContainer}>
      <View style={styles.baseShelf}></View>
      <View style={styles.borderShelf}></View>
    </View>
  );
}

function LeftShelf() {
  return (
    <View style={styles.leftShelfContainer}>
      <View style={styles.leftShelfBase}></View>
      <View style={styles.leftShelfCorner}></View>
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
  middleShelfContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 70,
    width: "100%",
    zIndex: -1,
  },
  baseShelf: {
    backgroundColor: Colors.shelf.baseColor,
    height: 50,
    width: "100%",
  },
  borderShelf: {
    backgroundColor: Colors.shelf.borderColor,
    height: 20,
  },
  leftShelfContainer: {
    position: "absolute",
    left: -50,
    bottom: 0,
  },
  leftShelfBase: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 50,
    borderTopWidth: 50,
    borderRightColor: "transparent",
    borderTopColor: Colors.shelf.baseColor,
    transform: [{ rotate: "180deg" }],
  },
  leftShelfCorner: {
    backgroundColor: Colors.shelf.borderColor,
    borderBottomLeftRadius: 10,
    height: 20,
  },
});
