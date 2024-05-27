import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";
import Button from "./Button";
import Input from "./Input";

export type Filter = "all" | "movie" | "tv";
export type FilterWitchSearch = Filter | "search";

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
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [transitionWidth, setTransitionWidth] = useState<number>(
    Dimensions.get("window").width * 0.9
  );

  useEffect(() => {
    setTransitionWidth(
      isSearching ? 245 : Dimensions.get("window").width * 0.9
    );
  }, [isSearching]);

  useEffect(() => {
    currentFilter(filter);
  }, [filter]);

  return (
    <Animatable.View
      style={[styles.filterContainer, { width: transitionWidth }]}
      transition={"width"}
    >
      <View style={styles.container}>
        <Button
          onPress={() => setIsSearching(true)}
          _styles={styles.searchButton}
        >
          <Ionicons name="search" size={18} />
        </Button>
        {!isSearching ? (
          <>
            <Button
              onPress={() => setFilter("all")}
              selected={filter === "all"}
            >
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
          </>
        ) : (
          <Input
            variant="secondary"
            textInputConfig={{
              placeholder: "Search...",
              autoFocus: true,
              onBlur: () => setIsSearching(false),
            }}
            _styles={{ width: "100%", paddingRight: 12 }}
          />
        )}
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: "#14171D",
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    marginHorizontal: "auto",
    paddingHorizontal: 34,
    marginTop: 68 * (Platform.OS === "ios" ? 2 : 1),
  },
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  searchButton: { paddingHorizontal: 12 },
  searchInput: { width: "100%", paddingRight: 12 },
});
