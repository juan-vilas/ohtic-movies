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

export interface Root {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  backdrop_path: string;
  id: number;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  title?: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  original_name?: string;
  name?: string;
  first_air_date?: string;
  origin_country?: string[];
}

export default function TabOneScreen() {
  const [trending, setTrending] = useState<Root>({
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
      .then((response: Root) => {
        setTrending(response);
        console.log(response);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <LinearGradient
      colors={["#262A32", "#171B20", "#0B0F14"]}
      style={{
        ...styles.background,
        height: Dimensions.get("window").height,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <ScrollView style={styles.container}>
        <View style={{ height: 38, backgroundColor: "transparent" }}></View>
        {trending.total_results > 0 ? (
          <>
            <MovieShelf data={trending.results}></MovieShelf>
            <MovieShelf data={[...trending.results].reverse()}></MovieShelf>
            <MovieShelf data={trending.results}></MovieShelf>
          </>
        ) : null}

        <View style={{ height: 96, backgroundColor: "transparent" }}></View>
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
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
