import { styles as tabStyles } from "@/app/(tabs)/_layout";
import FiltersMenu, { Filter } from "@/components/FiltersMenu";
import MovieShelf from "@/components/MovieShelf";
import * as movieAPI from "@/shared/apis/MovieAPI";
import { TrendingState } from "@/shared/interfaces/trending";
import { RootState } from "@/shared/redux/store";
import { getTrendingAll } from "@/shared/redux/trendingAll";
import { getTrendingMovies } from "@/shared/redux/trendingMovies";
import { getTrendingTV } from "@/shared/redux/trendingTV";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
  const trendingAll = useSelector((state: RootState) => state.trendingAll);
  const trendingMovies = useSelector(
    (state: RootState) => state.trendingMovies
  );
  const trendingTV = useSelector((state: RootState) => state.trendingTV);
  const dispatch = useDispatch();

  const [refresh, setRefresh] = useState(true);
  const [trending, setTrending] = useState<TrendingState>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  });
  const [filter, setFilter] = useState<Filter>("all");
  const [pages, setPages] = useState<number>(1);
  const [isInitialized, setIsInitialized] = useState(false);

  // Get 3 pages on page initialization
  useEffect(() => {
    (async () => {
      const PAGES = 3;
      for (var i = 1; i <= PAGES; i++) {
        const response = await movieAPI.getTrendingAll(i);
        if (response) dispatch(getTrendingAll(response));
      }
      setPages(PAGES + 1);
      setIsInitialized(true);
    })();
  }, []);

  // Fetch more pages on end reach depending on selected filter
  useEffect(() => {
    if (!isInitialized) return;

    if (filter === "tv") {
      (async () => {
        const min = Math.min(trendingTV.total_pages || 10, trendingTV.page + 3); // Fetches 3 pages
        for (var i = trendingTV.page + 1; i <= min; i++) {
          const response = await movieAPI.getTrendingTV(i);
          dispatch(getTrendingTV(response));
        }
      })();
    }
    if (filter === "movies") {
      (async () => {
        const min = Math.min(
          trendingMovies.total_pages || 10,
          trendingMovies.page + 3
        ); // Fetches 3 pages
        for (var i = trendingMovies.page + 1; i <= min; i++) {
          const response = await movieAPI.getTrendingMovies(i);
          dispatch(getTrendingMovies(response));
        }
      })();
    }
    if (filter === "all") {
      (async () => {
        const min = Math.min(
          trendingAll.total_pages || 10,
          trendingAll.page + 3
        ); // Fetches 3 pages
        for (var i = trendingAll.page + 1; i <= min; i++) {
          const response = await movieAPI.getTrendingAll(i);
          dispatch(getTrendingAll(response));
        }
      })();
    }
  }, [pages]);

  useEffect(() => {
    if (filter === "all") {
      setTrending(trendingAll);
    }
    if (filter === "movies") {
      setTrending(trendingMovies);
    }
    if (filter === "tv") {
      setTrending(trendingTV);
    }
    setRefresh(!refresh);
  }, [filter, trendingAll, trendingMovies, trendingTV]);

  useEffect(() => {
    setRefresh(!refresh);
  }, [trending, pages]);

  return (
    <LinearGradient
      colors={["#262A32", "#171B20", "#0B0F14"]}
      style={styles.background}
    >
      <FlashList
        data={trending.results}
        extraData={refresh}
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
        onEndReached={() => setPages(pages + 3)}
        renderItem={({ item, index }) => {
          return (
            <MovieShelf
              extraData={refresh}
              data={item}
              key={"movieshelf-" + index}
              height={220}
            />
          );
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
