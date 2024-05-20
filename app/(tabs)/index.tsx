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

export default function TabOneScreen() {
  const [trending, setTrending] = useState<Trending>({
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0,
  });

  useEffect(() => {
    const API_KEY =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOGI0N2E4YTllN2UwNTkwMjAwMWIyZTY2NThmN2YyYSIsInN1YiI6IjY2NDhiYzFlZTY4YjdjNjhjYjc4YmY0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.00T7xQ3LPrwGFfCPPbWZmP05wYI55iZ9ruwhqlnCK_c";

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + API_KEY,
      },
    };

    fetch(
      "https://api.themoviedb.org/3/trending/all/day?language=en-US",
      options
    )
      .then((response) => response.json())
      .then((response: Trending) => {
        setTrending(response);
        console.log(response);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <LinearGradient
      colors={["#262A32", "#171B20", "#0B0F14"]}
      style={styles.background}
    >
      <ScrollView style={styles.container}>
        <View style={styles.marginTopView}></View>
        {trending.total_results > 0 ? (
          <>
            <MovieShelf data={trending.results}></MovieShelf>
            <MovieShelf data={[...trending.results].reverse()}></MovieShelf>
            <MovieShelf data={trending.results}></MovieShelf>
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
