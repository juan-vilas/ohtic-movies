import Button from "@/components/Button";
import Chip from "@/components/Chip";
import { Filter } from "@/components/FiltersMenu";
import Movie3DCase from "@/components/Movie3DCover";
import * as movieAPI from "@/shared/apis/MovieAPI";
import { getCredits, getVideos } from "@/shared/apis/MovieAPI";
import CoverURL from "@/shared/constants/CoverURL";
import { MovieCast } from "@/shared/interfaces/casting";
import { Genre } from "@/shared/interfaces/genres";
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
  const [genres, setGenres] = useState<Genre[]>();

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

    movieAPI.getGenres(result.media_type).then((genresResult) => {
      setGenres(genresResult.genres);
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
            <Text style={styles.secondaryText}>
              {new Date(result.release_date || result.first_air_date || "")
                .toDateString()
                .substring(4)}
            </Text>
          </View>

          {!!genres ? (
            <View style={styles.chipContainer}>
              {result.genre_ids.map((el) => {
                const name = genres.find((value) => value.id === el)?.name;
                return <Chip>{name}</Chip>;
              })}
            </View>
          ) : null}

          <Text style={styles.secondaryText}>{result.overview}</Text>

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
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.castingContainer}
            >
              {credits.cast.map((el, index) => {
                return (
                  <View
                    style={{
                      ...styles.castingDetails,
                      marginLeft: index === 0 ? 12 : 0,
                    }}
                    key={index}
                  >
                    <Image
                      source={{
                        uri: CoverURL + el.profile_path,
                      }}
                      style={styles.castingImage}
                    />
                    <Text style={styles.primaryText}>{el.name}</Text>
                    <Text style={styles.secondaryText}>{el.character}</Text>
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
  primaryText: { color: "white" },
  section: {
    borderTopColor: "#1C1F25",
    borderTopWidth: 2,
    paddingVertical: 16,
    justifyContent: "space-between",
    rowGap: 10,
  },
  title: { color: "white", fontSize: 20, fontWeight: "bold" },
  secondaryText: { color: "#959595", fontWeight: "semibold" },
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
  castingDetails: { marginRight: 12, width: 130 },
  castingImage: { borderRadius: 10, width: 130, height: 130 },
  castingContainer: { marginHorizontal: -24 },
  chipContainer: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
});
