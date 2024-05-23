import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Button from "./Button";

export type Filter = "all" | "movie" | "tv";

/**
 * @interface Props
 * @property {Filter} defaultFilter - Default filter to be shown selected
 * @property {(filter:Filter) => void} currentFilter - Callback that returns the current filter
 */
interface Props {
  defaultFilter: Filter;
  currentFilter: (filter: Filter) => void;
}

/**
 * Shows a filter menu
 */
export default function FiltersMenu({ defaultFilter, currentFilter }: Props) {
  const [filter, setFilter] = useState<Filter>(defaultFilter);

  useEffect(() => {
    currentFilter(filter);
  }, [filter]);

  return (
    <>
      <View style={styles.marginTopView}></View>
      <View style={styles.filterContainer}>
        <Button onPress={() => setFilter("all")} selected={filter === "all"}>
          All
        </Button>
        <Button
          onPress={() => setFilter("movie")}
          selected={filter === "movie"}
        >
          Movies
        </Button>
        <Button onPress={() => setFilter("tv")} selected={filter === "tv"}>
          TV
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  marginTopView: {
    height: 68 * (Platform.OS === "ios" ? 2 : 1),
    backgroundColor: "transparent",
  },
  filterContainer: {
    backgroundColor: "#14171D",
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 46,
    padding: 8,
  },
});
