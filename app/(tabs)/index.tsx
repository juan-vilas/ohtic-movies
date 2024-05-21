import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";

import { View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import MovieShelf from "@/components/MovieShelf";
import { styles as tabStyles } from "@/app/(tabs)/_layout";
import { Trending } from "@/shared/interfaces/trending";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";
import * as movieAPI from "@/shared/apis/MovieAPI";
import { getTrendingMovies } from "@/shared/redux/trendingMovies";
import { getTrendingTV } from "@/shared/redux/trendingTV";

export default function TabOneScreen() {
  const trendingMovies = useSelector(
    (state: RootState) => state.trendingMovies
  );
  const trendingTV = useSelector((state: RootState) => state.trendingTV);
  const dispatch = useDispatch();

  useEffect(() => {
    movieAPI.getTrendingMovies().then((response) => {
      dispatch(getTrendingMovies(response));
    });
    movieAPI.getTrendingTV().then((response) => {
      dispatch(getTrendingTV(response));
    });
  }, []);

  return (
    <LinearGradient
      colors={["#262A32", "#171B20", "#0B0F14"]}
      style={styles.background}
    >
      <ScrollView style={styles.container}>
        <View style={styles.marginTopView}></View>
        {trendingMovies.total_results > 0 ? (
          <>
            <MovieShelf data={trendingMovies.results}></MovieShelf>
            <MovieShelf data={trendingTV.results}></MovieShelf>
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
  marginTopView: { height: 38, backgroundColor: "transparent" },
  marginBottomView: {
    height: tabStyles.tabBarStyle.height + 38,
    backgroundColor: "transparent",
  },
});
