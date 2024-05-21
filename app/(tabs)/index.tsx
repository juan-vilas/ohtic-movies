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
import { Result, Trending } from "@/shared/interfaces/trending";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";
import * as movieAPI from "@/shared/apis/MovieAPI";
import { getTrendingMovies } from "@/shared/redux/trendingMovies";
import { getTrendingTV } from "@/shared/redux/trendingTV";
import { getTrendingAll } from "@/shared/redux/trendingAll";
import Button from "@/components/Button";
import Movie3DCover from "@/components/Movie3DCover";

type Filter = "all" | "movies" | "tv";

export default function TabOneScreen() {
  const trendingAll = useSelector((state: RootState) => state.trendingAll);
  const trendingMovies = useSelector(
    (state: RootState) => state.trendingMovies
  );
  const trendingTV = useSelector((state: RootState) => state.trendingTV);
  const dispatch = useDispatch();

  const [refresh, setRefresh] = useState(true);
  const [trending, setTrending] = useState<Trending>({
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
  });
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    if (filter === "movies") {
      if (trendingMovies.results.length === 0) {
        movieAPI.getTrendingMovies().then((response) => {
          dispatch(getTrendingMovies(response));
          setTrending(response);
        });
      } else {
        setTrending(trendingMovies);
      }
    }
    if (filter === "tv") {
      if (trendingTV.results.length === 0) {
        movieAPI.getTrendingTV().then((response) => {
          dispatch(getTrendingTV(response));
          setTrending(response);
        });
      } else {
        setTrending(trendingTV);
      }
    }
    if (filter === "all") {
      if (trendingAll.results.length === 0) {
        movieAPI.getTrendingAll().then((response) => {
          dispatch(getTrendingAll(response));
          setTrending(response);
        });
      } else {
        setTrending(trendingAll);
      }
    }
  }, [filter]);

  useEffect(() => {
    setRefresh(!refresh);
  }, [trending]);

  return (
    <LinearGradient
      colors={["#262A32", "#171B20", "#0B0F14"]}
      style={styles.background}
    >
      <ScrollView style={styles.container}>
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
          <Button onPress={() => setFilter("all")} selected={filter === "all"}>
            All
          </Button>
          <Button
            onPress={() => setFilter("movies")}
            selected={filter === "movies"}
          >
            Movies
          </Button>
          <Button onPress={() => setFilter("tv")} selected={filter === "tv"}>
            TV
          </Button>
        </View>

        {trending.total_results > 0 ? (
          <>
            <MovieShelf
              extraData={refresh}
              data={trending.results}
            ></MovieShelf>
          </>
        ) : null}

        <View style={styles.marginBottomView}></View>
      </ScrollView>
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
  marginTopView: { height: 68, backgroundColor: "transparent" },
  marginBottomView: {
    height: tabStyles.tabBarStyle.height + 38,
    backgroundColor: "transparent",
  },
});
