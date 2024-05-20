import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Animated,
  Easing,
  Platform,
  StyleProp,
  ViewStyle,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { getColors } from "react-native-image-colors";
import hexToRgba from "hex-to-rgba";
import { Link, router } from "expo-router";

interface Props {
  image?: string;
  rotate?: boolean;
  height: number;
  width: number;
  animation?: boolean;
  style?: Object;
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
  image,
  rotate = false,
  width,
  height,
  animation = true,
  style,
}: Props) => {
  const [colors, setColors] = useState<any>({
    dominant: "#000",
    background: "#000",
  });
  const [loaded, setLoaded] = useState<boolean>(false);
  const [colorsLoaded, setColorsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!image) return;
    getColors(image).then((response) => {
      setColors(response);
      setColorsLoaded(true);
    });
    Image.prefetch(image).then((value) => setLoaded(value));
  }, []);

  return (
    <View style={{ height, width, marginRight: 50, ...style }}>
      <Link
        href={{
          pathname: "/shows/[id]",
          params: { id: "bacon", image },
        }}
      >
        {colorsLoaded && loaded ? (
          <Animatable.View
            animation={animation ? fadeIn : undefined}
            style={styles.container}
          >
            <Image
              source={{ uri: image }}
              onLoad={() => setLoaded(true)}
              fadeDuration={0}
              style={{
                ...styles.image,
                transform: [{ skewY: rotate ? "5deg" : "0deg" }],
                width,
                height,
              }}
            />
            <View
              style={{
                width: 16,
                height: 0,
                borderBottomLeftRadius: 4,
                borderTopLeftRadius: 4,
                borderBottomRightRadius: 5,
                borderTopRightRadius: 5,
                borderBottomWidth: height,
                marginTop: rotate ? -5 : -2,
                marginLeft: rotate ? -3 : -6,
                zIndex: -1,
                transform: [
                  { perspective: 10 },
                  { rotateY: "5deg" },
                  { skewY: rotate ? "5deg" : "0deg" },
                  { scaleY: rotate ? 0.94 : 0.974 },
                ],
              }}
            >
              <LinearGradient
                // Background Linear Gradient
                colors={[
                  colors[Platform.OS === "ios" ? "background" : "dominant"],
                  hexToRgba(
                    colors[Platform.OS === "ios" ? "background" : "dominant"],
                    0.4
                  ),
                ]}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  height,
                  borderBottomLeftRadius: 4,
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                }}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
              />
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
});

export default Movie3DCover;
