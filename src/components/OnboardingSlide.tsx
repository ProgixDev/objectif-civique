import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";

type Props = {
  imageSource: ImageSourcePropType;
  height: number;
  backgroundColor: string;
};

export function OnboardingSlide({
  imageSource,
  height,
  backgroundColor,
}: Props) {
  const { width } = useWindowDimensions();
  const resolved = Image.resolveAssetSource(imageSource as number);
  const aspectRatio =
    resolved && resolved.width && resolved.height
      ? resolved.width / resolved.height
      : 3 / 4;
  const imageHeight = width / aspectRatio;

  return (
    <View style={[styles.container, { width, height, backgroundColor }]}>
      <Image
        source={imageSource}
        style={[styles.image, { width, height: imageHeight }]}
        resizeMode="contain"
      />
      <View style={styles.tint} pointerEvents="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  image: {
    alignSelf: "flex-end",
  },
  tint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.22)",
  },
});
