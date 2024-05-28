import { search } from "@/shared/apis/MovieAPI";
import { addMedia, clearMedia } from "@/shared/redux/trending";
import { sleep } from "@/shared/redux/utils";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Dimensions, Keyboard, Platform, StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { useDispatch } from "react-redux";
import Button from "./Button";
import Input from "./Input";

export type Filter = "all" | "movie" | "tv";
export type FilterWithSearch = Filter | "search";

/**
 * @interface Props
 * @property {Filter} defaultFilter - Default filter to be shown selected
 * @property {(filter:FilterWithSearch) => void} currentFilter - Callback that returns the current filter
 * @property {(isSearching:boolean) => void} isCurrentlySearching - Callback that returns if is searching
 * @property {boolean} showSearch - Show/hide search
 */
interface Props {
  defaultFilter: Filter;
  currentFilter: (filter: Filter) => void;
  isCurrentlySearching?: (isSearching: boolean) => void;
  showSearch?: boolean;
}

/**
 * Shows a filter menu
 */
export default function FiltersMenu({
  defaultFilter,
  currentFilter,
  isCurrentlySearching = () => {},
  showSearch = true,
}: Props) {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [transitionWidth, setTransitionWidth] = useState<number>(
    Dimensions.get("window").width * 0.9
  );

  useEffect(() => {
    setTransitionWidth(
      isSearching ? 245 : Dimensions.get("window").width * 0.9
    );

    isCurrentlySearching(isSearching);
  }, [isSearching]);

  useEffect(() => {
    if (query === "") return;

    const clearId = setTimeout(async () => {
      Keyboard.dismiss();

      dispatch(clearMedia({ filter }));
      let searchResponse = await search(query, 1);
      dispatch(addMedia({ trending: searchResponse, filter }));

      for (var i = 2; i < searchResponse.total_pages; i++) {
        await sleep(1000);
        searchResponse = await search(query, i + 1);
        dispatch(addMedia({ trending: searchResponse, filter }));
      }
    }, 1000);

    return () => {
      clearTimeout(clearId);
    };
  }, [query]);

  useEffect(() => {
    currentFilter(filter);
  }, [filter]);

  return (
    <Animatable.View
      style={[styles.filterContainer, { width: transitionWidth }]}
      transition={"width"}
    >
      <View style={styles.container}>
        {showSearch ? (
          <Button
            onPress={() => setIsSearching(true)}
            _styles={styles.searchButton}
          >
            <Ionicons name="search" size={18} />
          </Button>
        ) : null}
        {!isSearching ? (
          <>
            <Button
              onPress={() => setFilter("all")}
              selected={!isSearching && filter === "all"}
            >
              All
            </Button>
            <Button
              onPress={() => setFilter("movie")}
              selected={!isSearching && filter === "movie"}
            >
              Movies
            </Button>
            <Button
              onPress={() => setFilter("tv")}
              selected={!isSearching && filter === "tv"}
            >
              TV
            </Button>
          </>
        ) : (
          <>
            <Input
              variant="secondary"
              textInputConfig={{
                placeholder: "Search...",
                autoFocus: true,
                onChangeText: (text) => setQuery(text),
              }}
              _styles={{ width: "100%", paddingRight: 12 }}
            />
            <Ionicons
              name="close"
              size={18}
              color={"#949599"}
              style={{ paddingRight: 12 }}
              onPress={() => {
                console.log("clearing");
                setIsSearching(false);
                dispatch(clearMedia({ filter }));
              }}
            />
          </>
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
