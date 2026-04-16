import React, { useMemo } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { Assets } from "@/constants/assets";

const ICONS: ImageSourcePropType[] = [
  Assets.achievements.firstStep,
  Assets.achievements.streak7,
  Assets.achievements.centurion,
  Assets.achievements.excellence,
  Assets.achievements.perfectTheme,
  Assets.achievements.earlyBird,
  Assets.achievements.nightOwl,
  Assets.achievements.marathon,
  Assets.achievements.scholar,
  Assets.achievements.citizen,
  Assets.themes.institutions,
  Assets.themes.histoire,
  Assets.themes.valeurs,
  Assets.themes.geographie,
  Assets.themes.culture,
  Assets.perso.naturalisation,
  Assets.perso.csp,
  Assets.perso.cr,
  Assets.perso.channelSocial,
  Assets.perso.channelSearch,
  Assets.perso.channelFriend,
  Assets.perso.channelOther,
];

type Props = {
  height: number;
  iconSize?: number;
  tileOpacity?: number;
  tintColor?: string;
  style?: ViewStyle;
};

export function IconTilePattern({
  height,
  iconSize = 28,
  tileOpacity = 0.1,
  tintColor = "#1a1c1e",
  style,
}: Props) {
  const tiles = useMemo(() => {
    const count = Math.ceil((height / iconSize) * 14);
    return Array.from({ length: count }, (_, i) => {
      const icon = ICONS[i % ICONS.length];
      const rot = ((i * 37) % 40) - 20;
      return { icon, rot, key: i };
    });
  }, [height, iconSize]);

  return (
    <View
      pointerEvents="none"
      style={[
        styles.wrap,
        { height, opacity: tileOpacity, padding: iconSize * 0.25 },
        style,
      ]}
    >
      {tiles.map(({ icon, rot, key }) => (
        <Image
          key={key}
          source={icon}
          style={[
            styles.tile,
            {
              width: iconSize,
              height: iconSize,
              margin: iconSize * 0.18,
              transform: [{ rotate: `${rot}deg` }],
              tintColor,
            },
          ]}
          resizeMode="contain"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    justifyContent: "center",
    overflow: "hidden",
  },
  tile: {},
});
