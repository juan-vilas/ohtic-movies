import { styles as tabStyles } from "@/app/(tabs)/_layout";
import FiltersMenu, { Filter } from "@/components/FiltersMenu";
import MovieShelf from "@/components/MovieShelf";
import * as movieAPI from "@/shared/apis/MovieAPI";
import { RootState } from "@/shared/redux/store";
import {
  addAllMedia,
  addMovieMedia,
  addTVMedia,
} from "@/shared/redux/trending";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
  const trending = useSelector((state: RootState) => state.trending);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState<Filter>("all");

  const fetchPages = async (pages: number) => {
    const maxPages = Math.min(
      trending[filter].total_pages | 10,
      trending[filter].page + pages
    );
    const _pages = trending[filter].page + 1;
    for (var i = _pages; i <= maxPages; i++) {
      const response = await movieAPI.getTrendingShows(i, filter);
      if (filter === "all") {
        dispatch(addAllMedia(response));
      }
      if (filter === "movie") {
        dispatch(addMovieMedia(response));
      }
      if (filter === "tv") {
        dispatch(addTVMedia(response));
      }
    }
  };

  return (
    <LinearGradient
      colors={["#262A32", "#171B20", "#0B0F14"]}
      style={styles.background}
    >
      <FlashList
        data={[...trending[filter].results]}
        onEndReachedThreshold={0.3}
        estimatedItemSize={716}
        ListHeaderComponent={() => (
          <FiltersMenu
            defaultFilter={filter}
            currentFilter={(filter) => {
              setFilter(filter);
            }}
          />
        )}
        ListFooterComponent={() => (
          <View style={styles.marginBottomView}></View>
        )}
        onEndReached={() => fetchPages(3)}
        renderItem={({ item }) => {
          return <MovieShelf data={item} height={220} />;
        }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get("window").height,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  marginBottomView: {
    height: tabStyles.tabBarStyle.height + 38,
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
