import Button from "@/components/Button";
import Movie3DCover from "@/components/Movie3DCover";
import { getVideos } from "@/shared/apis/MovieAPI";
import CoverURL from "@/shared/constants/CoverURL";
import { MovieData } from "@/shared/interfaces/trending";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

export default function ShowPage() {
  const [result, setResult] = useState<MovieData>();
  const [trailerId, setTrailerId] = useState<string>();
  const { data } = useLocalSearchParams<{ id: string; data: any }>();

  const getTrailerHeight = () => {
    const windowWidth = Dimensions.get("window").width;
    let height = ((windowWidth - 48) / 16) * 9;
    return height;
  };

  const [trailerHeight, setTrailerHeight] = useState<number>(0);

  useEffect(() => {
    // Parse query data
    setResult(JSON.parse(data));
  }, []);

  useEffect(() => {
    if (!result?.id) return; // Wait for the parsed data

    getVideos(result.id).then((response) => {
      if (response.results?.length > 0) {
        // Find official trailer
        for (const result of response.results) {
          if (!result.official) continue;
          if (result.type !== "Teaser") continue;
          if (result.site !== "YouTube") continue;
          setTrailerId(result.key);
          break;
        }
      }
    });
  }, [result]);

  useEffect(() => {
    setTrailerHeight(getTrailerHeight());
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setTrailerHeight(getTrailerHeight());
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return !result ? null : (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.cover}>
        <Image
          source={{
            uri: CoverURL + result.poster_path,
          }}
          style={styles.background}
          blurRadius={10}
        />
        <Movie3DCover
          data={result}
          animation={false}
          rotate
          width={150 * 1.5}
          height={220 * 1.5}
          style={{ marginVertical: 56, marginTop: 86 }}
        />
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.menuDivider}></View>
        <View style={{ ...styles.section, borderTopWidth: 0 }}>
          <View>
            <Text style={styles.title}>{result.title || result.name}</Text>
            <Text style={styles.date}>
              {new Date(result.release_date || result.first_air_date || "")
                .toDateString()
                .substring(4)}
            </Text>
          </View>
          <Text style={styles.date}>{result.overview}</Text>

          <Button selected onPress={() => {}}>
            Add to Library
          </Button>
        </View>

        {trailerId ? (
          <View>
            <View style={styles.section}>
              <Text style={styles.title}>Trailer</Text>
            </View>
            <YoutubePlayer
              webViewProps={{
                // Mobile style
                containerStyle: {
                  ...styles.player,
                  height: trailerHeight,
                },
              }}
              webViewStyle={{
                // Web style
                ...styles.player,
                height: trailerHeight,
              }}
              height={trailerHeight}
              videoId={trailerId}
            />
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#14181F",
  },
  cover: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: { width: "100%", height: "120%", position: "absolute" },
  detailsContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#14181F",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
  },
  detailsText: { color: "white" },
  section: {
    borderTopColor: "#1C1F25",
    borderTopWidth: 2,
    paddingVertical: 16,
    justifyContent: "space-between",
    rowGap: 10,
  },
  title: { color: "white", fontSize: 20, fontWeight: "bold" },
  date: { color: "#959595", fontWeight: "semibold" },
  rate: { color: "white", fontWeight: "bold" },
  player: {
    borderRadius: 14,
  },
  menuDivider: {
    marginHorizontal: "auto",
    backgroundColor: "#343a44",
    width: 46,
    height: 4,
    borderRadius: 100,
  },
});
