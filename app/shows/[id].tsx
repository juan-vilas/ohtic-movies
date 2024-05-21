import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Movie3DCover from "@/components/Movie3DCover";
import { Result } from "@/shared/interfaces/trending";
import YoutubePlayer from "react-native-youtube-iframe";
import { Videos } from "@/shared/interfaces/videos";
import { getVideos } from "@/shared/apis/MovieAPI";

export default function ShowPage() {
  const [result, setResult] = useState<Result>();
  const [trailerId, setTrailerId] = useState<string>();
  const { id, data } = useLocalSearchParams<{ id: string; data: any }>();

  useEffect(() => {
    setResult(JSON.parse(data));
  }, []);

  useEffect(() => {
    if (!result?.id) return;
    getVideos(result.id).then((response) => {
      if (
        response.results?.length > 0 &&
        response.results[0].site === "YouTube"
      ) {
        setTrailerId(response.results[0].key);
      }
    });
  }, [result]);

  return !result ? null : (
    <ScrollView style={styles.container}>
      <View style={styles.cover}>
        <Image
          source={{
            uri: "https://image.tmdb.org/t/p/w300" + result.poster_path,
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
        />
      </View>

      <View style={styles.detailsContainer}>
        <View style={{ ...styles.section, borderTopWidth: 0 }}>
          <View style={{}}>
            <Text style={styles.title}>{result.title || result.name}</Text>
            <Text style={styles.date}>
              {new Date(result.release_date || result.first_air_date || "")
                .toDateString()
                .substring(4)}
            </Text>
            <Text style={styles.date}>{result.overview}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.detailsText}>add to watchlist</Text>
          <Text style={styles.detailsText}>add to library</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Watch Online</Text>
        </View>
        {trailerId ? (
          <>
            <View style={styles.section}>
              <Text style={styles.title}>Trailer</Text>
            </View>
            <YoutubePlayer
              webViewStyle={{}}
              webViewProps={{
                containerStyle: {
                  borderRadius: 14,
                },
              }}
              height={200}
              videoId={trailerId}
            />
          </>
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
    paddingVertical: 24,
  },
  detailsText: { color: "white" },
  section: {
    borderTopColor: "#1C1F25",
    borderTopWidth: 2,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { color: "white", fontSize: 20, fontWeight: "bold" },
  date: { color: "#959595", fontWeight: "semibold" },
  rate: { color: "white", fontWeight: "bold" },
});
