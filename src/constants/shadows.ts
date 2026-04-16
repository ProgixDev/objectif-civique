import { ViewStyle } from "react-native";

export const Shadows = {
  card: {
    shadowColor: "#191c1e",
    shadowOpacity: 0.06,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  } as ViewStyle,
  modal: {
    shadowColor: "#191c1e",
    shadowOpacity: 0.06,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  } as ViewStyle,
  soft: {
    shadowColor: "#191c1e",
    shadowOpacity: 0.04,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  } as ViewStyle,
} as const;
