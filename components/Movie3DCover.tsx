import CoverURL from "@/shared/constants/CoverURL";
import { MediaData } from "@/shared/interfaces/trending";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import hexToRgba from "hex-to-rgba";
import React, { useEffect, useState } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { getColors } from "react-native-image-colors";

interface Props {
  rotate?: boolean;
  height: number;
  width: number;
  animation?: boolean;
  style?: Object;
  data: MediaData;
}

/**
 * Shows a movie case with a 3D effect
 */
const Movie3DCase = ({
  rotate = false,
  width,
  height,
  animation = true,
  style,
  data,
}: Props) => {
  const [dominantColor, setColors] = useState<string>("#000");
  const [loaded, setLoaded] = useState<boolean>(false);
  const [colorsLoaded, setColorsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!data.poster_path) return;
    // if (Platform.OS === "web") {
    //   setColors("#cecece");
    //   setColorsLoaded(true);
    // } else {
    getColors(CoverURL + data.poster_path).then((response) => {
      if (response["platform"] === "android" && Platform.OS === "android") {
        setColors(response.dominant);
      } else if (response["platform"] === "ios" && Platform.OS === "ios") {
        setColors(response.background);
      } else if (response["platform"] === "web" && Platform.OS === "web") {
        setColors(response.dominant);
      }
      setColorsLoaded(true);
    });
    // }
    Image.prefetch(CoverURL + data.poster_path).then((value) =>
      setLoaded(true)
    );
  }, []);

  return !data.poster_path ? null : (
    <View
      style={{
        height,
        width,
        transform: rotate ? [{ rotateZ: "5deg" }] : [],
        ...style,
      }}
    >
      <Link
        href={{
          pathname: "/details/[data]",
          params: {
            data: JSON.stringify(data),
          },
        }}
      >
        {colorsLoaded && loaded ? (
          <Animatable.View
            animation={animation ? "fadeIn" : undefined}
            style={styles.container}
          >
            <Image
              source={{
                uri: CoverURL + data.poster_path,
              }}
              onLoad={() => setLoaded(true)}
              fadeDuration={0}
              style={{
                ...styles.image,
                transform: [{ skewY: "0deg" }],
                width,
                height,
              }}
            />

            <View style={{ ...styles.rating, width }}>
              <LinearGradient // Background Linear Gradient
                colors={["rgba(255,255,255,0)", "rgba(0,0,0,1)"]}
                style={{ ...styles.ratingGradient, width }}
                start={{ x: 0.5, y: 0 }}
              ></LinearGradient>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 4,
                }}
              >
                <Ionicons name="star" color={"gold"} size={14} />
                <Text style={{ color: "white" }}>
                  {data.vote_average.toFixed(2)}
                </Text>
              </View>
              <Text style={{ color: "white" }}>
                {data.media_type === "movie" ? "MOVIE" : "TV"}
              </Text>
            </View>

            <View style={{ marginLeft: -2 }}>
              <View
                style={{
                  ...styles.threeDGradientEffect,
                  borderBottomWidth: height,
                }}
              >
                <LinearGradient // Background Linear Gradient
                  colors={[dominantColor, hexToRgba(dominantColor, 0.4)]}
                  style={{
                    ...styles.threeDGradientEffectBackground,
                    height,
                  }}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                />
              </View>
            </View>
          </Animatable.View>
        ) : null}
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
    borderRadius: 5,
  },
  rating: {
    position: "absolute",
    left: 0,
    bottom: 0,
    paddingHorizontal: 8,
    paddingBottom: 4,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
    justifyContent: "space-between",
    flex: 1,
  },
  ratingGradient: {
    position: "absolute",
    left: 0,
    bottom: 0,
    height: "100%",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  threeDGradientEffect: {
    width: 12,
    height: 0,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    zIndex: -1,
    transform: [
      { perspective: 10 },
      { rotateY: "5deg" },
      { skewY: "0deg" },
      { scaleY: 0.95 },
    ],
  },

  threeDGradientEffectBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export default Movie3DCase;
