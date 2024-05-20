import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Animated,
  Easing,
  Platform,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { getColors } from "react-native-image-colors";
import hexToRgba from "hex-to-rgba";

interface Props {
  image: string;
  rotate?: boolean;
  height: number;
  width: number;
}
const fadeIn = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};

const Movie3DCover = ({ image, rotate = false, width, height }: Props) => {
  const [colors, setColors] = useState<any>({
    dominant: "#000",
    background: "#000",
  });
  const [loaded, setLoaded] = useState<boolean>(false);
  const [colorsLoaded, setColorsLoaded] = useState<boolean>(false);

  useEffect(() => {
    getColors(image).then((response) => {
      setColors(response);
      setColorsLoaded(true);
    });
    Image.prefetch(image).then((value) => setLoaded(value));
  }, []);

  return (
    <View style={{ height, width, marginRight: 50 }}>
      {colorsLoaded && loaded ? (
        <Animatable.View animation={fadeIn} style={styles.container}>
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
              borderBottomEndRadius: 5,
              borderTopEndRadius: 5,
              borderBottomWidth: height,
              marginTop: rotate ? 10.5 : -2,
              marginLeft: -6,
              zIndex: -1,
              transform: [
                { perspective: 10 },
                { rotateY: "5deg" },
                { skewY: rotate ? "5deg" : "0deg" },
                { scaleY: 0.974 },
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
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
              }}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            />
          </View>
        </Animatable.View>
      ) : null}
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
