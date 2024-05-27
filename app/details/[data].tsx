import Button from "@/components/Button";
import { Filter } from "@/components/FiltersMenu";
import Movie3DCase from "@/components/Movie3DCover";
import { getCredits, getVideos } from "@/shared/apis/MovieAPI";
import CoverURL from "@/shared/constants/CoverURL";
import { MovieCast } from "@/shared/interfaces/casting";
import { MediaData, MediaPosition } from "@/shared/interfaces/trending";
import { RootState } from "@/shared/redux/store";
import { findMediaPosition } from "@/shared/redux/utils";
import { addMedia, removeMedia } from "@/shared/redux/watchlist";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import YoutubePlayer from "react-native-youtube-iframe";
import { useDispatch, useSelector } from "react-redux";

export default function ShowPage() {
  const { data } = useLocalSearchParams<{ id: string; data: any }>();
  const watchList = useSelector((state: RootState) => state.watchList);
  const dispatch = useDispatch();

  const [result, setResult] = useState<MediaData>();
  const [mediaPositions, setMediaPositions] = useState<MediaPosition[]>([]);
  const [trailerId, setTrailerId] = useState<string>();
  const [isTrailerReady, setTrailerIsReady] = useState<boolean>(
    Platform.OS === "web"
  );

  const getTrailerHeight = () => {
    const windowWidth = Dimensions.get("window").width;
    let height = ((windowWidth - 48) / 16) * 9;
    return height;
  };

  const [trailerHeight, setTrailerHeight] = useState<number>(0);
  const [credits, setCredits] = useState<MovieCast>({
    id: -1,
    cast: [],
    crew: [],
  });

  useEffect(() => {
    // Parse query data
    const result: MediaData = JSON.parse(data);
    setResult(result);

    setTrailerHeight(getTrailerHeight());
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setTrailerHeight(getTrailerHeight());
    });

    getCredits(result.id, result.media_type).then((credits) => {
      setCredits(credits);
    });

    return () => {
      subscription.remove();
    };
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
    if (!result) return;

    const _mediaPositions = [];
    for (const filter of ["all", "movie", "tv"]) {
      const mediaPosition = findMediaPosition(
        watchList,
        result.id,
        filter as Filter
      );
      if (mediaPosition.found) {
        _mediaPositions.push(mediaPosition);
      }
    }
    setMediaPositions(_mediaPositions);
  }, [watchList, result]);

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
        <Movie3DCase
          data={result}
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

          <Button
            selected
            onPress={() => {
              if (mediaPositions.length > 0) {
                dispatch(removeMedia({ mediaId: result.id, filter: "all" }));
                dispatch(
                  removeMedia({
                    mediaId: result.id,
                    filter: result.media_type as Filter,
                  })
                );
              } else {
                dispatch(addMedia({ mediaData: result, filter: "all" }));
                dispatch(
                  addMedia({
                    mediaData: result,
                    filter: result.media_type as Filter,
                  })
                );
              }
            }}
          >
            {mediaPositions.length > 0
              ? "Remove from Library"
              : "Add to Library"}
          </Button>
        </View>

        {credits.cast.length === 0 ? null : (
          <View style={styles.section}>
            <Text style={styles.title}>Cast</Text>
            <ScrollView horizontal>
              {credits.cast.map((el) => {
                return (
                  <View style={styles.castingContainer}>
                    <FastImage
                      source={{
                        uri: CoverURL + el.profile_path,
                      }}
                      style={styles.castingImage}
                    />
                    <Text style={styles.detailsText}>{el.name}</Text>
                    <Text style={styles.date}>{el.character}</Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        )}

        {trailerId ? (
          <View>
            <View style={styles.section}>
              <Text style={styles.title}>Trailer</Text>
            </View>
            {!isTrailerReady ? (
              <ActivityIndicator color={"white"} size={"large"} />
            ) : null}
            <YoutubePlayer
              onReady={() =>
                setTimeout(() => {
                  setTrailerIsReady(true);
                }, 1000)
              }
              webViewProps={{
                // Mobile style
                containerStyle: {
                  ...styles.player,
                  height: isTrailerReady ? trailerHeight : 0,
                },
              }}
              webViewStyle={{
                // Web style
                ...styles.player,
                height: isTrailerReady ? trailerHeight : 0,
              }}
              height={isTrailerReady ? trailerHeight : 0}
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
  castingContainer: { marginRight: 12, width: 130 },
  castingImage: { borderRadius: 10, width: 130, height: 130 },
});
