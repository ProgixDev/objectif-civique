import { TextStyle } from "react-native";

export const Typography = {
  display: {
    fontFamily: "Satoshi_700Bold",
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.2,
  } as TextStyle,
  h1: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: 0.2,
    textTransform: "uppercase",
  } as TextStyle,
  h2: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.2,
    textTransform: "uppercase",
  } as TextStyle,
  bodyLarge: {
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    lineHeight: 22,
  } as TextStyle,
  body: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    lineHeight: 20,
  } as TextStyle,
  caption: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    lineHeight: 16,
  } as TextStyle,
  button: {
    fontFamily: "Satoshi_600SemiBold",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.2,
  } as TextStyle,
} as const;
