import CoverURL from "@/shared/constants/CoverURL";
import { MovieData } from "@/shared/interfaces/trending";
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
  data: MovieData;
}

const fadeIn = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};

const Movie3DCover = ({
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
    {
      if (Platform.OS === "web") {
        setColors("#cecece");
        setColorsLoaded(true);
      } else {
        getColors(CoverURL + data.poster_path).then((response) => {
          if (response["platform"] === "android" && Platform.OS === "android") {
            setColors(response.dominant);
          } else if (response["platform"] === "ios" && Platform.OS === "ios") {
            setColors(response.background);
          }
          setColorsLoaded(true);
        });
      }
    }
    Image.prefetch(CoverURL + data.poster_path).then((value) =>
      setLoaded(true)
    );
  }, []);

  useEffect(() => {
    console.log(colorsLoaded, dominantColor, loaded);
  }, [colorsLoaded, dominantColor, loaded]);

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
          pathname: "/shows/[id]",
          params: {
            id: "bacon",
            data: JSON.stringify(data),
          },
        }}
      >
        {colorsLoaded && loaded ? (
          <Animatable.View
            animation={animation ? fadeIn : undefined}
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

            <View style={styles.rating}>
              <LinearGradient // Background Linear Gradient
                colors={["rgba(255,255,255,0)", "rgba(0,0,0,1)"]}
                style={{ ...styles.ratingGradient, width }}
                start={{ x: 0.5, y: 0 }}
              ></LinearGradient>
              <Ionicons name="star" color={"gold"} size={14}></Ionicons>
              <Text style={{ color: "white" }}>
                {data.vote_average.toFixed(2)}
              </Text>
            </View>

            <View style={{ marginLeft: -2 }}>
              <View
                style={{
                  ...styles.threeDGradientEffect,
                  borderBottomWidth: height,
                  transform: [
                    { perspective: 10 },
                    { rotateY: "5deg" },
                    { skewY: "0deg" },
                    { scaleY: 0.95 },
                  ],
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
    paddingLeft: 8,
    paddingBottom: 4,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 4,
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

export default Movie3DCover;
