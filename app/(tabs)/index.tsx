import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";

import { View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import MovieShelf from "@/components/MovieShelf";
import { styles as tabStyles } from "@/app/(tabs)/_layout";
import {
  MovieData,
  Trending,
  TrendingState,
} from "@/shared/interfaces/trending";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";
import * as movieAPI from "@/shared/apis/MovieAPI";
import { getTrendingMovies } from "@/shared/redux/trendingMovies";
import { getTrendingTV } from "@/shared/redux/trendingTV";
import { getTrendingAll } from "@/shared/redux/trendingAll";
import Button from "@/components/Button";
import Movie3DCover from "@/components/Movie3DCover";
import { FlashList } from "@shopify/flash-list";

type Filter = "all" | "movies" | "tv";

export default function TabOneScreen() {
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
        if (response) await dispatch(getTrendingAll(response));
      }
      setPages(PAGES + 1);
      setIsInitialized(true);
    })();
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    // if (filter === "movies") {
    //   if (trendingMovies.results.length === 0) {
    //     movieAPI.getTrendingMovies(pages).then((response) => {
    //       dispatch(getTrendingMovies(response));
    //       setTrending(response);
    //     });
    //   } else {
    //     setTrending(trendingMovies);
    //   }
    // }
    // if (filter === "tv") {
    //   if (trendingTV.results.length === 0) {
    //     movieAPI.getTrendingTV(pages).then((response) => {
    //       dispatch(getTrendingTV(response));
    //       setTrending(response);
    //     });
    //   } else {
    //     setTrending(trendingTV);
    //   }
    // }
    if (filter === "all") {
      (async () => {
        const min = Math.min(trendingAll.total_pages, trendingAll.page + 3);
        for (var i = pages === 1 ? 1 : trendingAll.page + 1; i <= min; i++) {
          const response = await movieAPI.getTrendingAll(i);
          dispatch(getTrendingAll(response));
        }
      })();
    }
  }, [pages]);

  useEffect(() => {
    setRefresh(!refresh);
  }, [trending]);

  useEffect(() => {
    setTrending(trendingAll);
  }, [trendingAll]);

  useEffect(() => {
    console.log("new page", pages);

    setRefresh(!refresh);
  }, [pages]);

  return (
    <LinearGradient
      colors={["#262A32", "#171B20", "#0B0F14"]}
      style={styles.background}
    >
      <FlashList
        data={[0]}
        onEndReachedThreshold={0.3}
        estimatedItemSize={716}
        onEndReached={() => setPages(pages + 3)}
        renderItem={() => {
          return (
            <>
              <View style={styles.marginTopView}></View>
              <View
                style={{
                  backgroundColor: "#14171D",
                  borderRadius: 100,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginHorizontal: 46,
                  padding: 8,
                }}
              >
                <Button
                  onPress={() => setFilter("all")}
                  selected={filter === "all"}
                >
                  All
                </Button>
                <Button
                  onPress={() => setFilter("movies")}
                  selected={filter === "movies"}
                >
                  Movies
                </Button>
                <Button
                  onPress={() => setFilter("tv")}
                  selected={filter === "tv"}
                >
                  TV
                </Button>
              </View>
              {trending.total_results > 0
                ? trending.results.map((item, index) => {
                    return (
                      <MovieShelf
                        extraData={refresh}
                        data={item}
                        key={"movieshelf-" + index}
                        height={220}
                      />
                    );
                  })
                : null}

              <View style={styles.marginBottomView}></View>
            </>
          );
        }}
      />
    </LinearGradient>
  );
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
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
  marginTopView: { height: 68, backgroundColor: "transparent" },
  marginBottomView: {
    height: tabStyles.tabBarStyle.height + 38,
    backgroundColor: "transparent",
  },
});
